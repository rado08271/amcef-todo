import {configureStore} from "@reduxjs/toolkit";
import TodoReducer from "../../todo/redux/todo-reducer.ts";
import { thunk } from 'redux-thunk'
import ProjectReducer from "../../todo/redux/project-reducer.ts";

export const initStore = configureStore({
    reducer: {
        todo: TodoReducer,
        project: ProjectReducer
    },
    middleware: getDefaultMiddleware => {
        // @ts-ignore
        return getDefaultMiddleware({thunk, serializableCheck: false})}
})

export type RootState = ReturnType<typeof initStore.getState>
export type AppDispatch = typeof initStore.dispatch

