import React from 'react';
import s from '../App.module.css'
import {FilterValueType, maxTaskTitleLength, TaskType} from "../App";
import {Task} from "./Task";
import {red} from "@mui/material/colors";
import {IconButton} from "@mui/material";
import {AddItemForm} from "./AddItemForm";
import CloseIcon from '@mui/icons-material/Close';
import {EditableSpan} from "./EditableSpan";

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
    const changeTitle = (newTitle: string) => props.changeTodolistTitle(props.id, newTitle)

    return (
        <div>
            <div className={s.tdl_header}>
                <EditableSpan
                    className={s.tdl_title}
                    maxTitleLength={17}
                    title={props.title}
                    changeTitle={changeTitle}
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
