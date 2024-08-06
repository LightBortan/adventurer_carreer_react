import React from "react"

export default function Background({ backgroundImage, monsterImage }) {
    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`
    }

    return(
        <div className="background" style={backgroundStyle}>
            <img src={monsterImage} alt=""/>
        </div>
    )
}