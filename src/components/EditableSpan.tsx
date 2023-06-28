import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@mui/material";
import {ErrorType} from "../App";

type EditableSpanPropsType = {
    className: string
    title: string
    maxTitleLength: number
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState<boolean>(false)
    const editModeOn = () => {
        setEditMode(true)
    }
    const editModeOff = () => {
        setEditMode(false)
    }

    let [value, setValue] = useState<string>(props.title)
    let [error, setError] = useState<ErrorType>('')

    const changeTitle = () => {
        if (value.trim() === '') {
            setError('Please enter title')
        } else {
            props.changeTitle(value)
            editModeOff()
        }
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        e.currentTarget.value.trim().length > props.maxTitleLength
            ? setError('Title is too long')
            : setError('')
    }
    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!error && e.key === "Enter") {
            changeTitle()
        } else if (e.key === "Escape") {
            setValue(props.title)
            editModeOff()
        }
    }
    const onBlur = () => {
        if (error !== 'Title is too long') {
            changeTitle()
        }
    }

    return editMode
        ? <TextField
            value={value}
            error={!!error}
            helperText={error}

            onChange={onChange}
            onBlur={onBlur}
            onKeyDown={onKeyDown}

            autoFocus
            variant="standard"
        />
        : <span
            className={props.className}
            onDoubleClick={editModeOn}>
            {props.title}
        </span>;
};

