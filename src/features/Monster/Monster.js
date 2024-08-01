import React from "react";
import { useSelector } from "react-redux";
import { selectMonster } from "./MonsterSlice";

export default function Monster() {
    const monster = useSelector(selectMonster);

    return( 
        <div className="mob">
            <ul className="Monster statblock">
                    <li>Name: <span>{monster.name}</span></li>
                    <li>Level: <span>{monster.currentLevel}</span></li>
                    <li>Healthpoints: <span className="end">{monster.hitpoints}</span>
                    </li>
                    <li>Attack: <span className="end">{monster.attack}</span></li>
                    <li>Defense: <span className="end">{monster.defense}</span></li>
                </ul>
        </div>
    )
}