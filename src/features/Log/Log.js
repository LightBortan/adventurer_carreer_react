import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLog, clearLog } from './LogSlice';

export default function Log() {
    const logList = useSelector(selectLog);
    const dispatch = useDispatch();

    const handleClear = () => {
        dispatch(clearLog());
    }

    return (
        <div className="log">
            <p>Log <button onClick={ handleClear }>Clear</button></p>
            <ul>
                {logList && logList.map((logItem, index) => (
                <li key={index}>{logItem}</li>
            ))}
            </ul>
        </div>
    );
}