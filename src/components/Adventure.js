import React from "react";
import Character from "../features/Character/Character";
import Log from "../features/Log/Log";
import Background from "./Background";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { rest, selectCharacter } from "../features/Character/CharacterSlice";
import { initializeMonster } from "../features/Monster/MonsterSlice";
import ROUTES from "../app/routes";
import { addLog } from "../features/Log/LogSlice";

import villageImage from '../Images/Backgrounds/village.jpg'


export default function Adventure() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const character = useSelector(selectCharacter)

    const createMob = () => {
        const name = 'Goblin'
        dispatch(addLog(`You encountered a ${name}`))
        let level = Math.round(Math.random()*character.currentLevel);
        if (level < 1){
            level = 1;
        }
        let points = level*5
        let hitpoints = 5
        let attack = 1
        let defense = 1
        while (points) {
            let roll = Math.floor(Math.random()*3)
            switch (roll) {
                case 0:
                    hitpoints += 5 ;
                    points -= 1;
                    break;
                case 1:
                    attack += 1;
                    points -= 1;
                    break;
                case 2:
                    defense += 1;
                    points -= 1;
                    break;
                default: 
                    console.log("Rolled a impossible number")
            }
        }
        return {
            name: name,
            currentLevel: level,
            hitpoints: hitpoints,
            attack: attack,
            defense: defense
        }
    }


    const handleCombat = () => {
        const initialMobState = createMob()
        dispatch(initializeMonster(initialMobState));

        navigate(ROUTES.combatRoute())
    }

    const handleRest = () => {
        dispatch(addLog("You rest to full health"))
        dispatch(rest());
    }

    return(
        <div>
            <Background backgroundImage={villageImage}/>
            <section className="Adventure-grid-container">
                <Log />
                <div className="buttonbox">
                    <button className="actionButton" onClick={handleCombat}>Combat</button>
                    <button className="actionButton" onClick={handleRest}>Rest</button>
                </div>
                <Character />
            </section>
        </div>
    )
}