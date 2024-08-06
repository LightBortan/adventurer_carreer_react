import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    logList: []
};

const logSlice = createSlice({
    name: 'Log',
    initialState,
    reducers: {
        initializeLog: (state, action) => {
            return {...state, ...action.payload}
        },
        addLog: (state, action) => {
            state.logList.unshift(action.payload);
            if (state.logList.length > 7){
                state.logList.pop();
            }
        },
        clearLog: (state) =>{
            state.logList = [];
        }
    }
})

export const { initializeLog, addLog, clearLog } = logSlice.actions;
export const selectLog = (state) => state.log.logList;

export default logSlice.reducer;