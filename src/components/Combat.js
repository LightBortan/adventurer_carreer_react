import React, { useState, useCallback, useEffect} from "react";
import Character from "../features/Character/Character";
import Monster from "../features/Monster/Monster";
import Log from "../features/Log/Log";
import { useSelector } from "react-redux";
import { addXp, changeDefendPower, selectCharacter, takeDamage, setDefendPower } from "../features/Character/CharacterSlice";
import { selectMonster, monsterTakeDamage } from "../features/Monster/MonsterSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ROUTES from "../app/routes";
import { addLog } from "../features/Log/LogSlice";


export default function Combat() {
    const character = useSelector(selectCharacter);
    const monster = useSelector(selectMonster);

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            if (monster.hitpoints > 0) {
                mobTurn();
            } else {
                dispatch(addLog(`You defeat the ${monster.name}`));
                dispatch(addXp(monster.currentLevel));
                endCombat();
            }
        }
    }, [isMonsterUpdate, monster.hitpoints, monster.name, monster.currentLevel, dispatch, endCombat, mobTurn]);

    return(
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
    )
}