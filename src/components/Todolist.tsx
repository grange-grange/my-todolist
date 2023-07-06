import React, {memo, MouseEvent, useCallback} from 'react';
import s from '../App.module.css'
import {FilterValueType, maxTaskTitleLength, maxTdlTitleLength, TaskType, TodolistType} from "../App";
import {Task} from "./Task";
import {red} from "@mui/material/colors";
import {IconButton, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {AddItemForm} from "./AddItemForm";
import CloseIcon from '@mui/icons-material/Close';
import {EditableSpan} from "./EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "../state/todolists-reducer";
import {addTaskAC} from "../state/taskstate-reducer";

type TodolistPropsType = {
    id: string
}

export const Todolist = memo((props: TodolistPropsType) => {
    const todolist = useSelector<AppRootStateType, TodolistType>(state => state.todolists.filter(tdl => tdl.id === props.id)[0])
    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todolist.id])
    const dispatch = useDispatch()

    const removeTodolist = () => dispatch(removeTodolistAC(todolist.id))
    const changeTodolistFilter = (e: MouseEvent<HTMLElement>, value: FilterValueType) => dispatch(changeTodolistFilterAC(todolist.id, value))
    const changeTodolistTitle = useCallback((newTitle: string) => dispatch(changeTodolistTitleAC(todolist.id, newTitle)), [dispatch])

    let filteredTasks = tasks
    if (todolist.filter === 'active') {
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    if (todolist.filter === 'completed') {
        filteredTasks = tasks.filter(t => t.isDone)
    }

    const addTask = useCallback((title: string) => dispatch(addTaskAC(todolist.id, title)), [dispatch])

    return (
        <div className={s.todolist}>
            <div className={s.tdl_header}>
                <EditableSpan
                    className={s.tdl_title}
                    maxTitleLength={maxTdlTitleLength}
                    title={todolist.title}
                    changeTitle={changeTodolistTitle}
                />
                <IconButton size="medium"
                            onClick={removeTodolist}
                            sx={{
                                position: "absolute",
                                right: 0,
                                top: 0,
                            }}
                >
                    <CloseIcon
                        fontSize="medium"
                        sx={{
                            color: red[800],
                            backgroundImage: 'none'
                        }}
                    />
                </IconButton>
            </div>
            <AddItemForm
                label={'Add task'}
                maxTitleLength={maxTaskTitleLength}
                tdlId={props.id}
                addTask={addTask}
            />
            <div>
                {filteredTasks.map(t => {
                    return <Task
                        key={t.id}
                        tdlId={props.id}
                        id={t.id}
                    />
                })}
            </div>
            <div className={s.filter}>
                <ToggleButtonGroup
                    color="secondary"
                    value={todolist.filter}
                    exclusive
                    onChange={changeTodolistFilter}
                    size="small"
                >
                    <ToggleButton value="all">All</ToggleButton>
                    <ToggleButton value="active">Active</ToggleButton>
                    <ToggleButton value="completed">Completed</ToggleButton>
                </ToggleButtonGroup>
            </div>
        </div>
    );
})
