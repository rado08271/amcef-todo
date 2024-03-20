import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ReducerState} from "../../common/context/typs.ts";
import {TodoDao} from "../data/todo.ts";
import {ProjectDao} from "../data/project.ts";
import {createTodoAPI, deleteTodoByIdAPI, getProjectByIdAPI, updateTodoAPI} from "../api/todo-repository.ts";

type TodoState = ReducerState<TodoDao[] | TodoDao>

const TodoInitialState: TodoState = {
    data: null,
    errors: [],
    status: "idle"
}

const getAllProjectTodosAction = createAsyncThunk<ProjectDao[], string>('todo/getTodos', async (projectId: string) => {
    const response = await getProjectByIdAPI(projectId)

    return response
})

const createTodoAction = createAsyncThunk<boolean, TodoDao>('todo/createTodo', async (todo: TodoDao) => {
    const response = await createTodoAPI(todo)

    return response
})

const deleteTodoAction = createAsyncThunk<boolean, string>('todo/deleteTodo', async (todoId: string) => {
    const response = await deleteTodoByIdAPI(todoId)

    return response
})

const updateTodoAction = createAsyncThunk<boolean, TodoDao>('todo/updateTodo', async (todo: TodoDao) => {
    const response = await updateTodoAPI(todo)

    return response
})


// @ts-ignore
const TodoSlice = createSlice({
    name: "todo",
    initialState: TodoInitialState,
    extraReducers: builder => {
        builder.addCase(getAllProjectTodosAction.pending, (state: TodoState, action) => {
            state.status = "loading"
            state.data = null
            state.name = action.type
        })
        builder.addCase(getAllProjectTodosAction.fulfilled, ((state: TodoState, action) => {
            state.status = "success"
            state.data = action.payload
            state.name = action.type
        }))
        builder.addCase(getAllProjectTodosAction.rejected, ((state: TodoState, action) => {
            state.status = "failed"
            state.name = action.type
        }))

        builder.addCase(createTodoAction.pending, (state: TodoState, action) => {
            state.status = "loading"
            state.name = action.type
        })
        builder.addCase(createTodoAction.fulfilled, ((state: TodoState, action) => {
            state.status = "success"
            state.name = action.type
        }))
        builder.addCase(createTodoAction.rejected, ((state: TodoState, action) => {
            state.status = "failed"
            state.name = action.type
        }))

        builder.addCase(deleteTodoAction.pending, (state: TodoState, action) => {
            state.status = "loading"
            state.name = action.type
        })
        builder.addCase(deleteTodoAction.fulfilled, ((state: TodoState, action) => {
            state.status = "success"
            state.name = action.type
        }))
        builder.addCase(deleteTodoAction.rejected, ((state: TodoState, action) => {
            state.status = "failed"
            state.name = action.type
        }))

        builder.addCase(updateTodoAction.pending, (state: TodoState, action) => {
            state.status = "loading"
            state.name = action.type
        })
        builder.addCase(updateTodoAction.fulfilled, ((state: TodoState, action) => {
            state.status = "success"
            state.name = action.type
        }))
        builder.addCase(updateTodoAction.rejected, ((state: TodoState, action) => {
            state.status = "failed"
            state.name = action.type
        }))
    }
})

const getAllProjectTodosSelector = ({todo}: { todo: TodoState }) =>
    todo.data
const getAllProjectTodosLoadingSelector = ({todo}: { todo: TodoState }) =>
    todo.name?.startsWith('todo/getTodos/') && todo.status === 'loading'
const getAllProjectTodosErrorSelector = ({todo}: { todo: TodoState }) =>
    todo.name?.startsWith('todo/getTodos/') && todo.status === 'failed'

const createTodoSelector = ({todo}: {todo: TodoState }) =>
    todo.name?.startsWith('todo/createTodo/') && todo.status === 'success'

const deleteTodoSelector = ({todo}: {todo: TodoState }) =>
    todo.name?.startsWith('todo/deleteTodo/') && todo.status === 'success'

const updateTodoSelector = ({todo}: {todo: TodoState }) =>
    todo.name?.startsWith('todo/updateTodo/') && todo.status === 'success'


export default TodoSlice.reducer

export {
    getAllProjectTodosAction,
    getAllProjectTodosSelector,
    getAllProjectTodosLoadingSelector,
    getAllProjectTodosErrorSelector,
    createTodoAction,
    createTodoSelector,
    deleteTodoAction,
    deleteTodoSelector,
    updateTodoAction,
    updateTodoSelector
}
