import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faRotateRight, faXmark, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import { ReactComponent as FeatherIcon } from './Feather.svg';
import { ReactComponent as ScorpionIcon } from './Scorpion.svg';
export default function App() {

    const [activeGods, setActiveGods] = useState([]);
    const [godConfirmed, setGodConfirmed] = useState(false);
    const [activeChosenGod, setActiveChosenGod] = useState('');
    const [displayGod, setDisplayGod] = useState('');

    const [cards, setCards] = useState([
        { id: 1, value: '', column: 1, row: 1, feathers: [false, false, false, false, false, false], scorpions: [false, false, false, false, false, false], god: null },
        { id: 2, value: '', column: 2, row: 1, feathers: [false, false, false, false, false, false], scorpions: [false, false, false, false, false, false], god: null },
        { id: 3, value: '', column: 3, row: 1, feathers: [false, false, false, false, false, false], scorpions: [false, false, false, false, false, false], god: null }
    ]);

    // Add a new card with null value
    const addCard = (newCardId, column) => {
        setCards([...cards, { id: newCardId, value: '', column: column, row: 2, feathers: [false, false, false, false, false, false], scorpions: [false, false, false, false, false, false], god: null }]);
    };

    const updateFeathers = (cardIndex, featherIndex) => {
        // Update all feathers in cardIndex to be false
        const newCards = [...cards];
        newCards[cardIndex].scorpions = newCards[cardIndex].scorpions.map((scorpion, idx) => scorpion = false);
        newCards[cardIndex].feathers = newCards[cardIndex].feathers.map((feather, idx) => feather = false);

        // Set all feathers up to and including featherIndex to be true
        for (let i = 0; i <= featherIndex; i++) {
            newCards[cardIndex].feathers[i] = true;
        }

        setCards(newCards);
    };

    const updateScorpions = (cardIndex, scorpionIndex) => {
        // Update all scorpions in cardIndex to be false
        const newCards = [...cards];
        newCards[cardIndex].feathers = newCards[cardIndex].feathers.map((feather, idx) => feather = false);
        newCards[cardIndex].scorpions = newCards[cardIndex].scorpions.map((scorpion, idx) => scorpion = false);

        // Set all scorpions up to and including scorpionIndex to be true
        for (let i = 0; i <= scorpionIndex; i++) {
            newCards[cardIndex].scorpions[i] = true;
        }

        setCards(newCards);
    };

    const setGods = (godName) => {
        if (activeGods.includes(godName)) {
            setActiveGods(activeGods.filter(name => name !== godName));
        } else {
            if(activeGods.length < 3) {
                setActiveGods([...activeGods, godName]);
            }
        }
    };

    return (
        <React.Fragment>
            <div id="title-area">
                <img src={`${process.env.PUBLIC_URL}/images/PillarsOfFateText.svg`} alt="Scales of Fate" id="title-image" />
            </div>
            <div id="god-area" style={ activeChosenGod === '' ? { gridTemplateColumns: "repeat(3, 1fr)", width: "60%" } : { gridTemplateColumns: "repeat(4, 1fr)", width: "80%" }}>
                { godConfirmed && activeGods.map((god, idx) => (
                    <img 
                        key={idx} 
                        src={`${process.env.PUBLIC_URL}/images/God-Icons/${god}-icon.PNG`} alt={god} 
                        className={ god === activeChosenGod ? 'chosen-god active' : 'chosen-god'} 
                        onClick={() => {
                            if(cards.some((card) => card.god !== null)) {
                                return;
                            } else {
                                setActiveChosenGod(god)}}
                            }
                        />
                )) }
                { 
                    activeChosenGod === '' ? null :
                        <FontAwesomeIcon icon={faXmark} className="fa-3x" color="white" onClick={ () => { setActiveChosenGod(''); } } />
                }
            </div>
            <div id="play-area">
                {cards.filter(card => card.value !== null).map((card, idx) => {
                    return (card.god === null) ? (
                        <div className="card" key={card.idx} style={{ gridColumn: card.column, gridRow: card.row }}>
                            <input
                                className="value"
                                type="number"
                                value={card.value}
                                placeholder="0"
                                onChange={e => {
                                    const newCards = [...cards];
                                    newCards[idx].value = e.target.value;
                                    setCards(newCards);
                                }}
                            />
                            {
                                card.id === 4 || card.id === 5 || card.id === 6 ?
                                <FontAwesomeIcon onClick={ () => { 
                                    const newCards = cards.filter(c => c.id !== card.id);
                                    setCards(newCards);
                                }} className="fa-xl" icon={faMinus} color="white" style={{ position: 'relative', top: '-20px', right: '-15px', opacity: 1 }} />
                                : null
                            }
                            <div className="icons" style={{ marginBottom: '10px' }}>
                                <FeatherIcon className="feather" style={ card.feathers[0] ? { color: '#d6b85fff' } : { color: 'white', opacity: .2 }} onClick={ () => { updateFeathers(idx, 0) }} />
                                <FeatherIcon className="feather" style={ card.feathers[1] ? { color: '#d6b85fff' } : { color: 'white', opacity: .2 }} onClick={ () => { updateFeathers(idx, 1) }} />
                                <FeatherIcon className="feather" style={ card.feathers[2] ? { color: '#d6b85fff' } : { color: 'white', opacity: .2 }} onClick={ () => { updateFeathers(idx, 2) }} />
                                <FeatherIcon className="feather" style={ card.feathers[3] ? { color: '#d6b85fff' } : { color: 'white', opacity: .2 }} onClick={ () => { updateFeathers(idx, 3) }} />
                            </div>
                            <div className="icons">
                                <ScorpionIcon className="scorpion" style={ card.scorpions[0] ? { color: '#5c948eff' } : { color: 'white', opacity: .2 }} onClick={ () => { updateScorpions(idx, 0) }} />
                                <ScorpionIcon className="scorpion" style={ card.scorpions[1] ? { color: '#5c948eff' } : { color: 'white', opacity: .2 }} onClick={ () => { updateScorpions(idx, 1) }} />
                                <ScorpionIcon className="scorpion" style={ card.scorpions[2] ? { color: '#5c948eff' } : { color: 'white', opacity: .2 }} onClick={ () => { updateScorpions(idx, 2) }} />
                                <ScorpionIcon className="scorpion" style={ card.scorpions[3] ? { color: '#5c948eff' } : { color: 'white', opacity: .2 }} onClick={ () => { updateScorpions(idx, 3) }} />
                            </div>
                            { activeChosenGod !== '' ? 
                                <div className="card-overlay" 
                                    onClick={() => { 
                                        card.god = activeChosenGod;
                                        setCards([...cards]);
                                        setActiveChosenGod('');
                                    }}
                                >
                                    <FontAwesomeIcon icon={faAngleDown} size="2x" color="white" />
                                </div> : null }
                        </div>
                    ) : (
                        <img src={`${process.env.PUBLIC_URL}/images/Gods/${card.god}.png`} alt="God" id="god-card" onClick={() => { setDisplayGod(card.god) }} key={card.idx} style={{ gridColumn: card.column, gridRow: card.row }}/>
                    )
                })}
                {
                    // Check for a card with an id of 4, 5, or 6 before rendering the add card divs
                    !cards.some(card => card.id === 4) &&
                        <div className="add-card" onClick={() => { addCard(4, 0) }} style={{ gridColumn: 1, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: '100px', width: '80px', border: '1px dashed #aaa', margin: '8px' }}>
                            <FontAwesomeIcon icon={faPlus} size="2x" color="grey" />
                        </div>
                }
                {
                    !cards.some(card => card.id === 5) &&
                        <div className="add-card" onClick={() => { addCard(5, 2) }} style={{ gridColumn: 2, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: '100px', width: '80px', border: '1px dashed #aaa', margin: '8px' }}>
                            <FontAwesomeIcon icon={faPlus} size="2x" color="grey" />
                        </div>
                }
                {   !cards.some(card => card.id === 6) &&
                        <div className="add-card" onClick={() => { addCard(6, 3) }} style={{ gridColumn: 3, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: '100px', width: '80px', border: '1px dashed #aaa', margin: '8px' }}>
                            <FontAwesomeIcon icon={faPlus} size="2x" color="grey" />
                        </div>
                }
            </div>
            <div id="reset">
                <FontAwesomeIcon icon={faRotateRight} size="3x" color="white" onClick={ () => { 
                    setCards([
                        { id: 1, value: '', column: 1, row: 1, feathers: [false, false, false, false, false, false], scorpions: [false, false, false, false, false, false], god: null },
                        { id: 2, value: '', column: 2, row: 1, feathers: [false, false, false, false, false, false], scorpions: [false, false, false, false, false, false], god: null },
                        { id: 3, value: '', column: 3, row: 1, feathers: [false, false, false, false, false, false], scorpions: [false, false, false, false, false, false], god: null }
                    ]);
                    setActiveChosenGod(''); 
                } 
                } 
                />
            </div>
            {   !godConfirmed &&
                <div id="god-icons-container">
                    <div id="god-icons">
                        <img src={`${process.env.PUBLIC_URL}/images/God-Icons/Agamar-icon.PNG`} alt="Agamar" className={activeGods.some(name => name === "Agamar") ? "god-icon active" : "god-icon"} onClick={() => {setGods("Agamar")}}/>
                        <img src={`${process.env.PUBLIC_URL}/images/God-Icons/Aponi-icon.PNG`} alt="Aponi" className={activeGods.some(name => name === "Aponi") ? "god-icon active" : "god-icon"} onClick={() => {setGods("Aponi")}}/>
                        <img src={`${process.env.PUBLIC_URL}/images/God-Icons/Arbiter-icon.PNG`} alt="" className={activeGods.some(name => name === "Arbiter") ? "god-icon active" : "god-icon"} onClick={() => {setGods("Arbiter")}}/>
                        <img src={`${process.env.PUBLIC_URL}/images/God-Icons/Belan-icon.PNG`} alt="" className={activeGods.some(name => name === "Belan") ? "god-icon active" : "god-icon"} onClick={() => {setGods("Belan")}}/>
                        <img src={`${process.env.PUBLIC_URL}/images/God-Icons/Eradan-icon.PNG`} alt="" className={activeGods.some(name => name === "Eradan") ? "god-icon active" : "god-icon"} onClick={() => {setGods("Eradan")}}/>
                        <img src={`${process.env.PUBLIC_URL}/images/God-Icons/Hadria-icon.PNG`} alt="" className={activeGods.some(name => name === "Hadria") ? "god-icon active" : "god-icon"} onClick={() => {setGods("Hadria")}}/>
                        <img src={`${process.env.PUBLIC_URL}/images/God-Icons/Invictus-icon.PNG`} alt="" className={activeGods.some(name => name === "Invictus") ? "god-icon active" : "god-icon"} onClick={() => {setGods("Invictus")}}/>
                        <img src={`${process.env.PUBLIC_URL}/images/God-Icons/Isabel-icon.PNG`} alt="" className={activeGods.some(name => name === "Isabel") ? "god-icon active" : "god-icon"} onClick={() => {setGods("Isabel")}}/>
                        <img src={`${process.env.PUBLIC_URL}/images/God-Icons/Klar-icon.PNG`} alt="" className={activeGods.some(name => name === "Klar") ? "god-icon active" : "god-icon"} onClick={() => {setGods("Klar")}}/>
                        <img src={`${process.env.PUBLIC_URL}/images/God-Icons/Mother-to-All-icon.PNG`} alt="" className={activeGods.some(name => name === "Mother-to-All") ? "god-icon active" : "god-icon"} onClick={() => {setGods("Mother-to-All")}}/>
                        <img src={`${process.env.PUBLIC_URL}/images/God-Icons/Naka-icon.PNG`} alt="" className={activeGods.some(name => name === "Naka") ? "god-icon active" : "god-icon"} onClick={() => {setGods("Naka")}}/>
                        <img src={`${process.env.PUBLIC_URL}/images/God-Icons/Namari-icon.PNG`} alt="" className={activeGods.some(name => name === "Namari") ? "god-icon active" : "god-icon"} onClick={() => {setGods("Namari")}}/>
                        <img src={`${process.env.PUBLIC_URL}/images/God-Icons/Penance-icon.PNG`} alt="" className={activeGods.some(name => name === "Penance") ? "god-icon active" : "god-icon"} onClick={() => {setGods("Penance")}}/>
                        <img src={`${process.env.PUBLIC_URL}/images/God-Icons/Pentha-icon.PNG`} alt="" className={activeGods.some(name => name === "Pentha") ? "god-icon active" : "god-icon"} onClick={() => {setGods("Pentha")}}/>
                        <img src={`${process.env.PUBLIC_URL}/images/God-Icons/Prophet-icon.PNG`} alt="" className={activeGods.some(name => name === "Prophet") ? "god-icon active" : "god-icon"} onClick={() => {setGods("Prophet")}}/>
                        <img src={`${process.env.PUBLIC_URL}/images/God-Icons/Saghari-icon.PNG`} alt="" className={activeGods.some(name => name === "Saghari") ? "god-icon active" : "god-icon"} onClick={() => {setGods("Saghari")}}/>
                        <img src={`${process.env.PUBLIC_URL}/images/God-Icons/Sorcerer-icon.PNG`} alt="" className={activeGods.some(name => name === "Sorcerer") ? "god-icon active" : "god-icon"} onClick={() => {setGods("Sorcerer")}}/>
                        <img src={`${process.env.PUBLIC_URL}/images/God-Icons/Steward-icon.PNG`} alt="" className={activeGods.some(name => name === "Steward") ? "god-icon active" : "god-icon"} onClick={() => {setGods("Steward")}}/>
                        <img src={`${process.env.PUBLIC_URL}/images/God-Icons/Tormentor-icon.PNG`} alt="" className={activeGods.some(name => name === "Tormentor") ? "god-icon active" : "god-icon"} onClick={() => {setGods("Tormentor")}}/>
                        <img src={`${process.env.PUBLIC_URL}/images/God-Icons/Vesper-icon.PNG`} alt="" className={activeGods.some(name => name === "Vesper") ? "god-icon active" : "god-icon"} onClick={() => {setGods("Vesper")}}/>
                        <button id="confirm-gods-button" onClick={ () => { setGodConfirmed(true); } } disabled={ activeGods.length !== 3}>CONFIRM</button>
                    </div>
                </div>
            }
            {
                displayGod !== '' &&
                <div id="god-display" onClick={() => { setDisplayGod(''); }}>
                    <img src={`${process.env.PUBLIC_URL}/images/Gods/${displayGod}.png`} alt="God" id="god-display-card" />
                </div>
            }
        </React.Fragment>
    );
}