import React from "react";
import Character from "../features/Character/Character";
import Log from "../features/Log/Log";
import Background from "./Background";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { rest, selectCharacter } from "../features/Character/CharacterSlice";
import { initializeMonster, setMonsterList } from "../features/Monster/MonsterSlice";
import ROUTES from "../app/routes";
import { addLog } from "../features/Log/LogSlice";
import CreateMonster from "../app/functions/CreateMonster";
import CreateEvents from "../app/functions/CreateEvents";

import villageImage from '../Images/Backgrounds/Village.jpg'


export default function Adventure() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const character = useSelector(selectCharacter)

    const handleCombat = () => {
        const event = CreateEvents();
        const monsterList = event.monsterlist;
        dispatch(setMonsterList(monsterList));
        const initialMobState = CreateMonster(monsterList[0], character)
        dispatch(addLog(`You encountered ${monsterList.length} ${monsterList[0]}`))
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