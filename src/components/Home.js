import React from "react";
import { Link } from "react-router-dom";
import ROUTES from "../app/routes";


export default function Home() {

    return(
        <section className="Homepage">
            <h1>Welcome to Adventurers Career</h1>
            <p>To get started you need to make a character</p>
            <Link to={ROUTES.createCharacterRoute()}>
                Create a Character
            </Link>
        </section>
    )
}