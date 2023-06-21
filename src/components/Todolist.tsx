import React from 'react';
import {FilterValueType, TaskType} from "../App";
import {Task} from "./Task";

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
            <h2>{props.title}</h2>
            <button onClick={removeTodolist}>x</button>
            <input/>
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
