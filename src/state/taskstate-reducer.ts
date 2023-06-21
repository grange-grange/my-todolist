import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2} from "./todolists-reducer";

type AddTaskActionType = ReturnType<typeof addTaskAC>
type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

type ActionType = AddTaskActionType | RemoveTaskActionType | ChangeTaskTitleActionType | ChangeTaskStatusActionType | AddTodolistActionType | RemoveTodolistActionType;

const initialState: TaskStateType = {
    [todolistId1]: [
        {id: v1(), title: 'bread', isDone: false},
        {id: v1(), title: 'milk', isDone: false},
        {id: v1(), title: 'beer', isDone: true}
    ],
    [todolistId2]: [
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'HTML', isDone: false},
        {id: v1(), title: 'something else', isDone: true}
    ]
}

export const taskStateReducer = (state: TaskStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'ADD-TASK':
            return {...state, [action.tdlId]: [{id: action.id, title: action.title, isDone: false}, ...state[action.tdlId]]}
        case 'REMOVE-TASK':
            return {...state, [action.tdlId]: [...state[action.tdlId].filter(t => t.id !== action.id)]}
        case 'CHANGE-TASK-TITLE':
            return {...state, [action.tdlId]: [...state[action.tdlId].map(t => t.id === action.id ? {...t, title: action.title} : t)]}
        case 'CHANGE-TASK-STATUS':
            return {...state, [action.tdlId]: [...state[action.tdlId].map(t => t.id === action.id ? {...t, isDone: action.status} : t)]}
        case 'ADD-TODOLIST':
            return {[action.id]: [], ...state}
        case 'REMOVE-TODOLIST':
            let newState = {...state}
            delete newState[action.id]
            return newState
        default:
            return state
    }
}

export const addTaskAC = (tdlId: string, title: string) => {
        return {type: 'ADD-TASK',tdlId, id: v1(), title} as const
}
export const removeTaskAC = (tdlId: string, id: string) => {
    return {type: 'REMOVE-TASK', tdlId, id} as const
}
export const changeTaskTitleAC = (tdlId: string, id: string, title: string) => {
    return {type: 'CHANGE-TASK-TITLE', tdlId, id, title} as const
}
export const changeTaskStatusAC = (tdlId: string, id: string, status: boolean) => {
    return {type: 'CHANGE-TASK-STATUS', tdlId, id, status} as const
}
