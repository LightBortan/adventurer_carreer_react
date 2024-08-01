import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import ROUTES from "./routes";

export default function AppLayout() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <NavLink to={ROUTES.homeRoute()}>
                        Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={ROUTES.createCharacterRoute()}>
                        Create character
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={ROUTES.adventureRoute()}>
                        Adventure
                        </NavLink>
                    </li>
                </ul>    
            </nav>
            <Outlet/>
        </div>
    );
}