import React, {useCallback} from 'react';
import s from './App.module.css';
import {Todolist} from "./components/Todolist";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTodolistAC} from "./state/todolists-reducer";
import {AddItemForm} from "./components/AddItemForm";

export type FilterValueType = 'all' | 'active' | 'completed'
export type ErrorType = '' | 'Title is too long' | 'Please enter title'
export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValueType
}
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TaskStateType = {
    [key: string]: TaskType[]
}

export const maxTdlTitleLength = 20
export const maxTaskTitleLength = 25

function App() {
    const todolistState = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    const dispatch = useDispatch()

    const addTodolist = useCallback((title: string) => dispatch(addTodolistAC(title)), [dispatch])

    return (
        <div className={s.App}>
            <AddItemForm
                label={'Add new todolist'}
                maxTitleLength={maxTdlTitleLength}
                addTodolist={addTodolist}
            />

            {todolistState.map(tdl => {
                return <Todolist
                    key={tdl.id}
                    id={tdl.id}
                />
            })}
        </div>
    );
}

export default App;
