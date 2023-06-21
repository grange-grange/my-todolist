import {todolistsReducer} from "./todolists-reducer";
import {taskStateReducer} from "./taskstate-reducer";
import {combineReducers, createStore} from "redux";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: taskStateReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

