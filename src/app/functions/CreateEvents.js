export default function CreateEvents() {
    const amountMonster = Math.floor(Math.random()*2)+1;
    const monsterNames = ['Goblin', 'Golina', 'Goblino'];
    const monsterList = [];
    for (let i=0; i < amountMonster; i++){
        monsterList.push(monsterNames[Math.floor(Math.random()*monsterNames.length)])
    }

    return {
        monsterlist: monsterList
    }
}