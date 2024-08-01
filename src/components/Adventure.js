import React from "react";
import Character from "../features/Character/Character";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { rest } from "../features/Character/CharacterSlice";
import ROUTES from "../app/routes";

export default function Adventure() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCombat = () => {
        navigate(ROUTES.combatRoute())
    }

    const handleRest = () => {
        dispatch(rest());
    }

    return(
        <div>
            <button onClick={handleCombat}>Combat</button>
            <button onClick={handleRest}>Rest-</button>
            <Character />
        </div>
    )
}