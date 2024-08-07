export default function CreateMonster(name, character) {
    let level = Math.round(Math.random()*character.currentLevel);
    if (level < 1){
        level = 1;
    }
    let points = level*5
    let hitpoints = 5
    let attack = 1
    let defense = 1
    while (points) {
        let roll = Math.floor(Math.random()*3)
        switch (roll) {
            case 0:
                hitpoints += 5 ;
                points -= 1;
                break;
            case 1:
                attack += 1;
                points -= 1;
                break;
            case 2:
                defense += 1;
                points -= 1;
                break;
            default: 
                console.log("Rolled a impossible number")
        }
    }
    return {
        name: name,
        currentLevel: level,
        hitpoints: hitpoints,
        attack: attack,
        defense: defense
    }    
}