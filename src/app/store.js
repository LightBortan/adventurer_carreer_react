import { configureStore } from "@reduxjs/toolkit";
import characterReducer from '../features/Character/CharacterSlice';
import monsterReducer from '../features/Monster/MonsterSlice';
import logReducer from '../features/Log/LogSlice';

export default configureStore({
    reducer: {
        character: characterReducer,
        monster: monsterReducer,
        log: logReducer,
    },
});