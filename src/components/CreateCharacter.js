import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { initializeCharacter } from "../features/Character/CharacterSlice";
import { initializeLog } from "../features/Log/LogSlice";
import { useNavigate } from "react-router-dom";
import ROUTES from "../app/routes";

export default function CreateCharacter() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('');

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const initialLogState = {
            logList: ['Welcome to your carreer']
        };
        dispatch(initializeLog(initialLogState));

        const initialCharacterState = {
            name,
            currentLevel: 1,
            currentXp: 0,
            maxHitpoints: 10,
            currentHitpoints: 10,
            attack: 1,
            defense: 1,
            defendpower: 0,
            attributePoints: 5
        };
        dispatch(initializeCharacter(initialCharacterState));
        
        navigate(ROUTES.adventureRoute());
    };

    return (
        <div className="createCharacter">
            <h1>Fill your Character's name in</h1> 
            <form onSubmit={handleSubmit}>
                <label htmlFor="CharacterName">Name: </label>
                <input type="text" id="CharacterName" value={name} onChange={handleChange} />
                <button type="submit">Create Character</button>
            </form>
        </div>
    );
}
