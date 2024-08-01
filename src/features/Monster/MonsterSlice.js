import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: '',
    currentLevel: 0,
    statDistribution: 0,
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
    }
})

export const { initializeMonster } = monsterSlice.actions;
export const selectMonster = (state) => state.monster;

export default monsterSlice.reducer;