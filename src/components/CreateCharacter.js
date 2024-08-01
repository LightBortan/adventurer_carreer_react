import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { initializeCharacter } from "../features/Character/CharacterSlice";
import { initializeMonster } from "../features/Monster/MonsterSlice";
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

        const initialMobState = {
            name: 'Alfred',
            currentLevel: 1,
            statDistribution: 0,
            hitpoints: 5,
            attack: 1,
            defense: 1,
        }
        dispatch(initializeMonster(initialMobState));
        
        navigate(ROUTES.adventureRoute());
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={handleChange} />
                    </label>
                </div>
                <button type="submit">Create Character</button>
            </form>
        </div>
    );
}
