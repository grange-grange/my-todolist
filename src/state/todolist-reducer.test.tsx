import React from 'react';
import {v1} from "uuid";
import {FilterValueType, TodolistType} from "../App";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";

let todolistId1: string
let todolistId2: string
let startState: TodolistType[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'To buy', filter: 'all'},
        {id: todolistId2, title: 'To learn', filter: 'all'}
    ]
})

test('adding tdl', () => {
    let todolistId3 = v1()
    const endState = todolistsReducer(startState, addTodolistAC(todolistId3, 'To pay'))
    expect(endState.length).toBe(3)
    expect(endState[2].id).toBe(todolistId2)
})

test('deleting tdl', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId2))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId1)
})

test('changing tdl title', () => {
    const newTitle = 'qwer'
    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTitle))
    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe(startState[0].title)
    expect(endState[1].title).toBe(newTitle)
})

test('changing tdl filter', () => {
    const newFilter: FilterValueType = 'completed'
    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter))
    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe(startState[0].filter)
    expect(endState[1].filter).toBe(newFilter)
})

