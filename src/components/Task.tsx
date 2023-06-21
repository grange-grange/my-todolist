import {Checkbox, IconButton} from '@mui/material';
import React from 'react';
import {FilterValueType, TaskType} from "../App";
import {purple} from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';

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


    return (
        <div>
            <Checkbox
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
            <h3>{props.title}</h3>
            <IconButton
                aria-label="delete"
                size="medium"
                onClick={removeTask}
            >
                <DeleteIcon
                    fontSize="medium"
                    sx={{
                        color: purple[800]
                    }}
                />
            </IconButton>
        </div>
    );
};
