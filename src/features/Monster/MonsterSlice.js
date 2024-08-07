import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentMonster: null,
    monsterList: [],
};

const monsterSlice = createSlice({
    name: 'Monster',
    initialState,
    reducers: {
        initializeMonster: (state, action) => {
            state.currentMonster = action.payload
        },
        setMonsterList: (state, action) => {
            state.monsterList = action.payload;
        },
        monsterTakeDamage: (state, action) => {
            if (state.currentMonster) {
                state.currentMonster = {
                    ...state.currentMonster,
                    hitpoints: state.currentMonster.hitpoints - (parseInt(action.payload)/state.currentMonster.defense)
                };
            }
        },
    }
})

export const { initializeMonster, setMonsterList ,monsterTakeDamage } = monsterSlice.actions;
export const selectMonster = (state) => state.monster.currentMonster;
export const selectMonsterList = (state) => state.monster.monsterList;
export default monsterSlice.reducer;