import React from "react";
import Character from "../features/Character/Character";
import Monster from "../features/Monster/Monster";
import { useSelector } from "react-redux";
import { selectCharacter } from "../features/Character/CharacterSlice";
import { selectMonster } from "../features/Monster/MonsterSlice";
import { useDispatch } from "react-redux";


export default function Combat() {
    const character = useSelector(selectCharacter);
    const monster = useSelector(selectMonster);
    const dispatch = useDispatch();

    return(
        <section className="grid-combat-container">
            <h1 className="log">Log</h1>
            <Monster />
            <p className="main"> Main :You do {character.attack} damage</p>
            <Character/>
        </section>
    )
}