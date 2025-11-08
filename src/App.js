import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import { ReactComponent as FeatherIcon } from './Feather.svg';
import { ReactComponent as ScorpionIcon } from './Scorpion.svg';
export default function App() {

    const [cards, setCards] = useState([
        { id: 1, value: '', column: 1, row: 1, feathers: [false, false, false, false, false, false], scorpions: [false, false, false, false, false, false] },
        { id: 2, value: '', column: 2, row: 1, feathers: [false, false, false, false, false, false], scorpions: [false, false, false, false, false, false] },
        { id: 3, value: '', column: 3, row: 1, feathers: [false, false, false, false, false, false], scorpions: [false, false, false, false, false, false] }
    ]);

    // Add a new card with null value
    const addCard = (newCardId, column) => {
        setCards([...cards, { id: newCardId, value: '', column: column, row: 2, feathers: [false, false, false, false, false, false], scorpions: [false, false, false, false, false, false] }]);
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

    return (
        <React.Fragment>
            <div id="title-area">
                <img src={`${process.env.PUBLIC_URL}/images/PillarsOfFateText.svg`} alt="Scales of Fate" id="title-image" />
            </div>
            <div id="play-area">
                {cards.filter(card => card.value !== null).map((card, idx) => (
                    <div className="card" key={card.id} style={{ gridColumn: card.column, gridRow: card.row }}>
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
                        <div className="icons" style={{ marginBottom: '15px' }}>
                            <FeatherIcon className="feather" style={ card.feathers[0] ? { color: '#d6b85fff' } : { color: 'white', opacity: .2 }} onClick={ () => { updateFeathers(idx, 0) }} />
                            <FeatherIcon className="feather" style={ card.feathers[1] ? { color: '#d6b85fff' } : { color: 'white', opacity: .2 }} onClick={ () => { updateFeathers(idx, 1) }} />
                            <FeatherIcon className="feather" style={ card.feathers[2] ? { color: '#d6b85fff' } : { color: 'white', opacity: .2 }} onClick={ () => { updateFeathers(idx, 2) }} />
                            <FeatherIcon className="feather" style={ card.feathers[3] ? { color: '#d6b85fff' } : { color: 'white', opacity: .2 }} onClick={ () => { updateFeathers(idx, 3) }} />
                            <FeatherIcon className="feather" style={ card.feathers[4] ? { color: '#d6b85fff' } : { color: 'white', opacity: .2 }} onClick={ () => { updateFeathers(idx, 4) }} />
                            <FeatherIcon className="feather" style={ card.feathers[5] ? { color: '#d6b85fff' } : { color: 'white', opacity: .2 }} onClick={ () => { updateFeathers(idx, 5) }} />
                        </div>
                        <div className="icons">
                            <ScorpionIcon className="scorpion" style={ card.scorpions[0] ? { color: '#5c948eff' } : { color: 'white', opacity: .2 }} onClick={ () => { updateScorpions(idx, 0) }} />
                            <ScorpionIcon className="scorpion" style={ card.scorpions[1] ? { color: '#5c948eff' } : { color: 'white', opacity: .2 }} onClick={ () => { updateScorpions(idx, 1) }} />
                            <ScorpionIcon className="scorpion" style={ card.scorpions[2] ? { color: '#5c948eff' } : { color: 'white', opacity: .2 }} onClick={ () => { updateScorpions(idx, 2) }} />
                            <ScorpionIcon className="scorpion" style={ card.scorpions[3] ? { color: '#5c948eff' } : { color: 'white', opacity: .2 }} onClick={ () => { updateScorpions(idx, 3) }} />
                            <ScorpionIcon className="scorpion" style={ card.scorpions[4] ? { color: '#5c948eff' } : { color: 'white', opacity: .2 }} onClick={ () => { updateScorpions(idx, 4) }} />
                            <ScorpionIcon className="scorpion" style={ card.scorpions[5] ? { color: '#5c948eff' } : { color: 'white', opacity: .2 }} onClick={ () => { updateScorpions(idx, 5) }} />
                        </div>
                    </div>
                ))}
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
                <FontAwesomeIcon icon={faRotateRight} size="3x" color="white" onClick={ () => { setCards([
                    { id: 1, value: '', column: 1, row: 1, feathers: [false, false, false, false, false, false], scorpions: [false, false, false, false, false, false] },
                    { id: 2, value: '', column: 2, row: 1, feathers: [false, false, false, false, false, false], scorpions: [false, false, false, false, false, false] },
                    { id: 3, value: '', column: 3, row: 1, feathers: [false, false, false, false, false, false], scorpions: [false, false, false, false, false, false] }
                ])} } 
                />
            </div>
        </React.Fragment>
    );
}