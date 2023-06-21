import {FilterValueType, TodolistType} from "../App";
import {v1} from "uuid";


export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

type ActionType = AddTodolistActionType | RemoveTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType;

export const todolistId1 = v1()
export const todolistId2 = v1()


const initialState: TodolistType[] = [
    {id: todolistId1, title: 'To buy', filter: 'all'},
    {id: todolistId2, title: 'To learn', filter: 'all'}
]

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionType) => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            return [{id: action.id, title: action.title, filter: 'all'}, ...state]
        case 'REMOVE-TODOLIST':
            return state.filter(tdl => tdl.id !== action.id)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tdl => tdl.id === action.id ? {...tdl, title: action.title} : tdl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tdl => tdl.id === action.id ? {...tdl, filter: action.filter} : tdl)
        default:
            return state
    }
}

export const addTodolistAC = (id: string, title: string) => {
        return {type: 'ADD-TODOLIST', id, title} as const
}
export const removeTodolistAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST', id} as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title} as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValueType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter} as const
}
