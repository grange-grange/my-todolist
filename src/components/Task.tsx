import {Checkbox, IconButton} from '@mui/material';
import React from 'react';
import s from '../App.module.css'
import {grey, purple} from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';
import {EditableSpan} from "./EditableSpan";
import {maxTaskTitleLength} from "../App";

type TaskPropsType = {
    tdlId: string,

    id: string,
    title: string,
    status: boolean

    removeTask: (tdlId: string, id: string) => void,
    changeTaskTitle: (tdlId: string, id: string, title: string) => void,
    changeTaskStatus: (tdlId: string, id: string, status: boolean) => void
}

export const Task = (props: TaskPropsType) => {
    const removeTask = () => props.removeTask(props.tdlId, props.id)
    const changeTaskStatus = () => props.changeTaskStatus(props.tdlId, props.id, !props.status)
    const changeTaskTitle = (newTitle: string) => props.changeTaskTitle(props.tdlId, props.id, newTitle)

    return (
        <div className={s.task}>
            <Checkbox className={s.checkbox}
                      checked={props.status}
                      onChange={changeTaskStatus}
                      inputProps={{'aria-label': 'controlled'}}
                      sx={{
                          color: purple[800],
                          '&.Mui-checked': {
                              color: purple[600],
                          },
                          '& .MuiSvgIcon-root': {
                              fontSize: 23
                          }
                      }}
            />
            <EditableSpan
                className={props.status ? s.task_isDone : ''}
                maxTitleLength={maxTaskTitleLength}
                title={props.title}
                changeTitle={changeTaskTitle}
            />
            <IconButton className={s.removeBtn}
                        aria-label="delete"
                        size="medium"
                        onClick={removeTask}
            >
                <DeleteIcon
                    fontSize="small"
                    sx={{
                        color: grey,
                    }}
                />
            </IconButton>
        </div>
    );
};
