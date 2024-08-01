import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCharacter, increaseHealth, increaseAttack, increaseDefense } from "./CharacterSlice";
import { NavLink } from "react-router-dom";
import ROUTES from "../../app/routes";

export default function Character() {
    const character = useSelector(selectCharacter);
    const dispatch = useDispatch();

    if (!character || !character.name){
        return <div>Please <NavLink to={ROUTES.createCharacterRoute()}>Create an Character</NavLink></div>
    }

    const handleHealthIncrease = () => {
        dispatch(increaseHealth());
    };

    const handleAttackIncrease = () => {
        dispatch(increaseAttack());
    };

    const handleDefenseIncrease = () => {
        dispatch(increaseDefense());
    };


    return (
        <div className="kar">
            {character && character.name && (
                <ul className="Character statblock">
                    <li>Name: <span>{character.name}</span></li>
                    <li>Level: <span>{character.currentLevel}</span></li>
                    <li>EXP: <span>{character.currentXp}</span></li>
                    <li>Attribute Points: <span>{character.attributePoints}</span></li>
                    <li>Healthpoints: <abbr>{character.attributePoints > 0 && (
                                <button onClick={handleHealthIncrease}>+</button>
                            )}
                            <span className="end">{character.currentHitpoints}/{character.maxHitpoints}</span></abbr>
                    </li>
                    <li>Attack: <abbr>{character.attributePoints > 0 && (
                                <button onClick={handleAttackIncrease}>+</button>
                            )}
                            <span className="end">{character.attack}</span></abbr></li>
                    <li>Defense: <abbr>{character.attributePoints > 0 && (
                                <button onClick={handleDefenseIncrease}>+</button>
                            )}
                            <span className="end">{character.defense}</span></abbr></li>
                    <li>Defend Power: <span>{character.defendpower}</span></li>
                </ul>
            )}
        </div>
    )
}