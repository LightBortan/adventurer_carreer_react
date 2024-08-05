import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: '',
    currentLevel: 0,
    hitpoints: 0,
    attack: 0,
    defense: 0,
};

const monsterSlice = createSlice({
    name: 'Monster',
    initialState,
    reducers: {
        initializeMonster: (state, action) => {
            return {...state, ...action.payload}
        },
        monsterTakeDamage: (state, action) => {
            const damage  = (parseInt(action.payload)/state.defense);
            state.hitpoints -= damage
        }
    }
})

export const { initializeMonster, monsterTakeDamage } = monsterSlice.actions;
export const selectMonster = (state) => state.monster;

export default monsterSlice.reducer;