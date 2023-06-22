import React from 'react';
import s from '../App.module.css'
import {FilterValueType, TaskType} from "../App";
import {Task} from "./Task";
import {red} from "@mui/material/colors";
import {IconButton} from "@mui/material";
import {AddItemForm} from "./AddItemForm";
import CloseIcon from '@mui/icons-material/Close';

type TodolistPropsType = {
    id: string,
    title: string,
    filter: FilterValueType,

    tasks: TaskType[]

    removeTodolist: (id: string) => void,
    changeTodolistTitle: (id: string, title: string) => void,
    changeTodolistFilter: (id: string, filter: FilterValueType) => void,

    addTask: (tdlId: string, title: string) => void,
    removeTask: (tdlId: string, id: string) => void,
    changeTaskTitle: (tdlId: string, id: string, title: string) => void,
    changeTaskStatus: (tdlId: string, id: string, status: boolean) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const removeTodolist = () => props.removeTodolist(props.id)

    return (
        <div>
            <div className={s.tdl_header}>
                <span className={s.tdl_title}>{props.title}</span>
                <IconButton className={s.removeBtn}
                            aria-label="delete"
                            size="medium"
                            onClick={removeTodolist}
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
                tdlId={props.id}
                addTask={props.addTask}
            />
            <div>
                {props.tasks.map(t => {
                    return <Task
                        tdlId={props.id}

                        id={t.id}
                        title={t.title}
                        status={t.isDone}

                        removeTask={props.removeTask}
                        changeTaskTitle={props.changeTaskTitle}
                        changeTaskStatus={props.changeTaskStatus}
                    />
                })}
            </div>
        </div>
    );
};
