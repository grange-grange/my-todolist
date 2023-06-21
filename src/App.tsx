import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterValueType = 'all' | 'completed' | 'active'

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValueType
}

type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type TaskStateType = {
    [key: string]: TaskType[]
}

function App() {


    return (
        <div className="App">
            <Todolist/>
        </div>
    );
}

export default App;
