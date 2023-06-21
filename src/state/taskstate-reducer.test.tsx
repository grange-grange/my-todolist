import React from 'react';
import {v1} from "uuid";
import {TaskStateType} from "../App";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    taskStateReducer
} from "./taskstate-reducer";

let todolistId1: string
let todolistId2: string
let startState: TaskStateType

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    // startStateTdl = [
    //     {id: todolistId1, title: 'To buy', filter: 'all'},
    //     {id: todolistId2, title: 'To learn', filter: 'all'}
    // ]

    startState = {
        [todolistId1]: [
            {id: '1', title: 'asdf', isDone: false},
            {id: '2', title: 'eqweqw', isDone: false},
            {id: '3', title: 'asdf', isDone: false},
        ],
        [todolistId2]: [
            {id: '4', title: 'zxcv', isDone: true},
            {id: '5', title: 'vcxz', isDone: false},
            {id: '6', title: 'fds', isDone: true},
        ]
    }
})

test('adding task', () => {
    const endState = taskStateReducer(startState, addTaskAC(todolistId2, 'lalala'))
    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId2].length).toBe(4)
    expect(endState[todolistId2][0].title).toBe('lalala')
})

test('deleting task', () => {
    const endState = taskStateReducer(startState, removeTaskAC(todolistId1, '1'))
    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId2].length).toBe(3)
    expect(endState[todolistId1][0].title).toBe('eqweqw')
})

test('changing task title', () => {
    const newTitle = 'qwer'
    const endState = taskStateReducer(startState, changeTaskTitleAC(todolistId1, '3', newTitle))
    expect(endState[todolistId1][2].title).toBe(newTitle)
    expect(endState[todolistId2][2].title).toBe('fds')
})

test('changing task status', () => {
    const endState = taskStateReducer(startState, changeTaskStatusAC(todolistId1, '2', true))
    expect(endState[todolistId1][1].isDone).toBe(true)
    expect(endState[todolistId2][1].isDone).toBe(false)
})

test('adding tdl', () => {
    let todolistId3 = v1()
    const endState = taskStateReducer(startState, addTodolistAC(todolistId3, 'aaarrrggghhh'))
    const toBe = {[todolistId3]:[], ...startState}
    expect(endState).toEqual(toBe)
})

test('deleting tdl', () => {
    const endState = taskStateReducer(startState, removeTodolistAC(todolistId2))
    const toBe = {
        [todolistId1]: [...startState[todolistId1]]
    }
    expect(endState.length).toEqual(toBe)
})

