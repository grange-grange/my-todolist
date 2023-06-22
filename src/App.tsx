import React from 'react';
import s from './App.module.css';
import {Todolist} from "./components/Todolist";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/taskstate-reducer";
import {AddItemForm} from "./components/AddItemForm";

export type FilterValueType = 'all' | 'completed' | 'active'

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

function App() {
    const todolistState = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    const taskState = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const addTodolist = (title: string) => dispatch(addTodolistAC(title))
    const removeTodolist = (id: string) => dispatch(removeTodolistAC(id))
    const changeTodolistTitle = (id: string, title: string) => dispatch(changeTodolistTitleAC(id, title))
    const changeTodolistFilter = (id: string, filter: FilterValueType) => dispatch(changeTodolistFilterAC(id, filter))

    const addTask = (tdlId: string, title: string) => dispatch(addTaskAC(tdlId, title))
    const removeTask = (tdlId: string, id: string) => dispatch(removeTaskAC(tdlId, id))
    const changeTaskTitle = (tdlId: string, id: string, title: string) => dispatch(changeTaskTitleAC(tdlId, id, title))
    const changeTaskStatus = (tdlId: string, id: string, status: boolean) => dispatch(changeTaskStatusAC(tdlId, id, status))


    return (
        <div className={s.App}>
            <AddItemForm label={'Add new todolist'} addTodolist={addTodolist} />

            {todolistState.map(tdl => {
                return <div className={s.todolist}>
                    <Todolist
                        id={tdl.id}
                        title={tdl.title}
                        filter={tdl.filter}

                        tasks={taskState[tdl.id]}

                        removeTodolist={removeTodolist}
                        changeTodolistTitle={changeTodolistTitle}
                        changeTodolistFilter={changeTodolistFilter}

                        addTask={addTask}
                        removeTask={removeTask}
                        changeTaskTitle={changeTaskTitle}
                        changeTaskStatus={changeTaskStatus}
                    />
                </div>
            })}
        </div>
    );
}

export default App;
