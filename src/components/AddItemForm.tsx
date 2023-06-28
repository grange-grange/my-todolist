import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import s from "../App.module.css";
import {Button, TextField, ButtonProps, styled} from "@mui/material";
import {purple} from "@mui/material/colors";
import AddIcon from '@mui/icons-material/Add';
import {ErrorType} from "../App";

type AddItemFormPropsType = {
    label: string
    maxTitleLength: number
    addTodolist?: (title: string) => void,
    tdlId?: string,
    addTask?: (tdlId: string, title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    let [value, setValue] = useState<string>('')
    let [error, setError] = useState<ErrorType>('')

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        if (e.currentTarget.value.trim().length > props.maxTitleLength) {
            setError('Title is too long')
        } else {
            setError('')
        }
    }
    const onBlur = () => {
        if (error !== 'Title is too long') setError('')
    }

    const addTask = () => {
        if (value.trim() === '') {
            setError('Please enter title')
        } else if (props.addTodolist) {
            props.addTodolist(value)
        } else if (props.tdlId && props.addTask) {
             props.addTask(props.tdlId, value)
        }
        setValue('')
    }
    const addTaskPressingEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTask()
    }

    return (
        <div className={s.AddItemForm}>
            <TextField
                error={!!error}
                label={props.label}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                onKeyDown={addTaskPressingEnter}
                variant="outlined"
                size='small'
                helperText={error}
                sx={{
                    minWidth: "230px",
                    minHeight: 40,
                }}
            />

            <ColorButton
                variant="contained"
                disabled={!!error}
                onClick={addTask}
                sx={{
                    minWidth: 40,
                    maxHeight: 40,
                    padding: '6px'
                }}
            >
                <AddIcon/>
            </ColorButton>
        </div>
    );
};

const ColorButton = styled(Button)<ButtonProps>(({theme}) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[700],
    '&:hover': {
        backgroundColor: purple[500],
    },
}));