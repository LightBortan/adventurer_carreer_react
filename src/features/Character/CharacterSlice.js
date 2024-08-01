import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: '',
    currentLevel: 0,
    currentXp: 0,
    maxHitpoints: 0,
    currentHitpoints: 0,
    attack: 0,
    defense: 0,
    defendpower: 0,
    attributePoints: 0
};

const characterSlice = createSlice({
    name: 'Character',
    initialState,
    reducers: {
        initializeCharacter: (state, action) => {
            return { ...state, ...action.payload };
        },
        increaseHealth: (state) => {
            if (state.attributePoints > 0) {
                state.maxHitpoints += 5
                state.currentHitpoints = Math.min(state.currentHitpoints + 5, state.maxHitpoints);
                state.attributePoints -= 1;
            }
        },
        increaseAttack: (state) => {
            if (state.attributePoints > 0) {
                state.attack += 1;
                state.attributePoints -= 1;
            }
        },
        increaseDefense: (state) => {
            if (state.attributePoints > 0) {
                state.defense += 1;
                state.attributePoints -= 1;
            }
        },
        addXp : (state, action) => {
            const { xp } = ((action.payload*5)/state.currentLevel);
            state.currentXp += xp;
            if (state.currentXp >= (state.currentLevel*10)) {
                state.attributePoints += 5;
                state.currentXp = state.currentXp - (state.currentLevel*10);
                state.currentLevel += 1;
            }
        },
        rest: (state) => {
            state.currentHitpoints = state.maxHitpoints;
        }
    }
});

export const { initializeCharacter, increaseHealth, increaseAttack, increaseDefense, rest, addXp } = characterSlice.actions;
export const selectCharacter = (state) => state.character;

export default characterSlice.reducer;
