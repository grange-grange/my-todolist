import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2} from "./todolists-reducer";

type AddTaskActionType = ReturnType<typeof addTaskAC>
type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
type ChangeTaskIsDoneActionType = ReturnType<typeof changeTaskIsDoneAC>

type ActionType = AddTaskActionType | RemoveTaskActionType | ChangeTaskTitleActionType | ChangeTaskIsDoneActionType | AddTodolistActionType | RemoveTodolistActionType;

const initialState: TaskStateType = {
    [todolistId1]: [],
    [todolistId2]: []
}

export const taskStateReducer = (state: TaskStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'ADD-TASK':
            return {...state, [action.tdlId]: [{id: action.id, title: action.title, isDone: false}, ...state[action.tdlId]]}
        case 'REMOVE-TASK':
            return {...state, [action.tdlId]: [...state[action.tdlId].filter(t => t.id !== action.id)]}
        case 'CHANGE-TASK-TITLE':
            return {...state, [action.tdlId]: [...state[action.tdlId].map(t => t.id === action.id ? {...t, title: action.title} : t)]}
        case 'CHANGE-TASK-ISDONE':
            return {...state, [action.tdlId]: [...state[action.tdlId].map(t => t.id === action.id ? {...t, isDone: action.isDone} : t)]}
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
export const changeTaskIsDoneAC = (tdlId: string, id: string, isDone: boolean) => {
    return {type: 'CHANGE-TASK-ISDONE', tdlId, id, isDone} as const
}
