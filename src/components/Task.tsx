import {Checkbox, IconButton} from '@mui/material';
import React, {memo, useCallback} from 'react';
import s from '../App.module.css'
import {grey, purple} from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';
import {EditableSpan} from "./EditableSpan";
import {maxTaskTitleLength, TaskType} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/taskstate-reducer";

type TaskPropsType = {
    tdlId: string,
    id: string
}

export const Task = memo((props: TaskPropsType) => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[props.tdlId].filter(t => t.id === props.id)[0])
    const dispatch = useDispatch()

    const removeTask = () => dispatch(removeTaskAC(props.tdlId, task.id))
    const changeTaskStatus = () => dispatch(changeTaskStatusAC(props.tdlId, task.id, !task.isDone))
    const changeTaskTitle = useCallback((newTitle: string) => dispatch(changeTaskTitleAC(props.tdlId, task.id, newTitle)), [dispatch])

    return (
        <div className={s.task}>
            <Checkbox className={s.checkbox}
                      checked={task.isDone}
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
                className={task.isDone ? s.task_isDone : ''}
                maxTitleLength={maxTaskTitleLength}
                title={task.title}
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
});
