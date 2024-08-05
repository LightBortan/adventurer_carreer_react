import React, {useEffect, useState, useCallback} from "react";
import Character from "../features/Character/Character";
import Monster from "../features/Monster/Monster";
import { useSelector } from "react-redux";
import { addXp, changeDefendPower, selectCharacter, takeDamage } from "../features/Character/CharacterSlice";
import { selectMonster, monsterTakeDamage } from "../features/Monster/MonsterSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ROUTES from "../app/routes";


export default function Combat() {
    const character = useSelector(selectCharacter);
    const monster = useSelector(selectMonster);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isMonsterUpdated, setIsMonsterUpdated] = useState(false);
    const [isCharacterUpdated, setIsCharacterUpdated] = useState(false);

    const mobTurn = useCallback(() => {
        dispatch(takeDamage(monster.attack));
        setIsCharacterUpdated(true);
    },[dispatch, monster.attack])

    const endTurn = useCallback(() => {
        if (character.defendpower > 0) {
            dispatch(changeDefendPower(-1));
        }
    }, [character.defendpower, dispatch])

    const endCombat = useCallback(() => {
        navigate(ROUTES.adventureRoute());
    }, [navigate])

    const handleAttack =() => {
        dispatch(monsterTakeDamage(character.attack));
        setIsMonsterUpdated(true);
    }

    const handleDefend = () => {
        dispatch(changeDefendPower(3));
        mobTurn();
        endTurn();
    }

    const handleFlee = () => {
        endCombat();
    }

    const characterDies = useCallback(() => {
        navigate(ROUTES.createCharacterRoute())
    }, [navigate])

    useEffect(() => {
        if (isCharacterUpdated) {
            if (character.currentHitpoints <= 0){
                characterDies()
            }
            setIsCharacterUpdated(false);
        }
        
    }, [isCharacterUpdated, character.currentHitpoints, characterDies]);

    useEffect(() => {
        if (isMonsterUpdated) {
            if (monster.hitpoints > 0){
                mobTurn();
                endTurn();
            }  else {
                dispatch(addXp(monster.currentLevel));
                endCombat();
            }
            setIsMonsterUpdated(false);  
        }      
    }, [isMonsterUpdated, monster.hitpoints, monster.attack, monster.currentLevel, dispatch, endCombat, mobTurn , endTurn]);


    return(
        <section className="grid-combat-container">
            <h1 className="log">Log</h1>
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