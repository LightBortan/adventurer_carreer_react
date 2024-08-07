import React, { useState, useCallback, useEffect} from "react";
import Character from "../features/Character/Character";
import Monster from "../features/Monster/Monster";
import Log from "../features/Log/Log";
import { useSelector } from "react-redux";
import { addXp, changeDefendPower, selectCharacter, takeDamage, setDefendPower } from "../features/Character/CharacterSlice";
import { selectMonster, monsterTakeDamage, selectMonsterList, setMonsterList, initializeMonster } from "../features/Monster/MonsterSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ROUTES from "../app/routes";
import { addLog } from "../features/Log/LogSlice";
import Background from "./Background";

import forestImage from '../Images/Backgrounds/forest.jpeg'
import monsterSprite from '../Images/Sprites/Goblin.png'
import CreateMonster from "../app/functions/CreateMonster";


export default function Combat() {
    const character = useSelector(selectCharacter);
    const monster = useSelector(selectMonster);
    const monsterList = useSelector(selectMonsterList);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [globalXp, setGlobalXp] = useState(0)
    const [isMonsterUpdate, setIsMonsterUpdate ] = useState(false)
    const [isCharacterUpdated, setIsCharacterUpdated] = useState(false);

    const mobTurn = useCallback(() => {
        dispatch(takeDamage(monster.attack));
        const damage = monster.attack / (character.defense + character.defendpower);
        dispatch(addLog(`You take ${+damage.toFixed(2)} damage`));
        setIsCharacterUpdated(true);
    }, [dispatch, monster.attack, character.defense, character.defendpower]);

    const endCombat = useCallback(() => {
        dispatch(setDefendPower(0));
        navigate(ROUTES.adventureRoute());
    }, [dispatch, navigate])

    const handleAttack =() => {
        dispatch(monsterTakeDamage(character.attack));
        const damage = character.attack/monster.defense;
        dispatch(addLog(`You deal ${+damage.toFixed(2)} damage.`))
        setIsMonsterUpdate(true);
    }

    const handleDefend = () => {
        dispatch(changeDefendPower(3));
        setIsMonsterUpdate(true);
    }

    const handleFlee = () => {
        dispatch(addLog(`You flee from the ${monster.name}`))
        endCombat();
    }

    const characterDies = useCallback(() => {
        navigate(ROUTES.createCharacterRoute())
    }, [navigate])

    useEffect(() => {
        if (isCharacterUpdated) {
            setIsCharacterUpdated(false);
            setTimeout(() =>{
                if (character.currentHitpoints <= 0) {
                    characterDies();
                } else if (character.defendpower > 0) {
                    dispatch(changeDefendPower(-1));
                }
            }, 5)
        }
    }, [isCharacterUpdated, character.currentHitpoints, character.defendpower, dispatch, characterDies]);

    useEffect(() => {
        if (isMonsterUpdate) {
            setIsMonsterUpdate(false);
            setTimeout(() => {
                if (monster.hitpoints > 0) {
                    mobTurn();
                } else {
                    dispatch(addLog(`You defeat the ${monster.name}`));
                    const currentGlobalXp = globalXp
                    setGlobalXp(currentGlobalXp + (monster.currentLevel*5))
                    const updatedMonsterList = monsterList.slice(1);
                    dispatch(setMonsterList(updatedMonsterList));
                    console.log(updatedMonsterList)
                    if (updatedMonsterList.length > 0){
                        dispatch(addLog(`You encountered a ${monsterList[0]}`))
                        const initialMobState = CreateMonster(updatedMonsterList[0], character)
                        dispatch(initializeMonster(initialMobState));
                    } else {
                        dispatch(addXp(globalXp));
                        endCombat();
                    }
                }
            }, 5)
        }
    }, [isMonsterUpdate, monster.hitpoints, monster.name, monster.currentLevel, dispatch, endCombat, mobTurn, monsterList, character, globalXp]);

    return(
        <div>
            <Background backgroundImage={forestImage} monsterImage={monsterSprite} />
            <section className="grid-combat-container">
                <Log />
                <Monster />
                <p className="main">
                    <button className="actionButton" onClick={handleAttack}>Attack</button>
                    <br />
                    <button className="actionButton" onClick={handleDefend}>Defend</button>
                    <br />
                    <button className="actionButton" onClick={handleFlee}>Flee</button>
                </p>
                <Character/>
            </section>
        </div>
    )
}