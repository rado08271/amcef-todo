import {TodoDao} from "../data/todo.ts";

const BASE_PATH = import.meta.env.VITE_BASE_PATH
export const getProjectByIdAPI = async (projectId: string, pageNumber?: number = 0): Promise<TodoDao[]> => {
    const url = new URL(`${BASE_PATH}/todos`)
    url.searchParams.append('projectId', projectId)

    const response = await fetch(url, {
        method: "GET",
        headers: {'content-type':'application/json'},
    })

    return await response.json<TodoDao[]>()
}

export const createTodoAPI = async (todoDao: TodoDao): Promise<boolean> => {
    const url = new URL(`${BASE_PATH}/todos`)

    const response = await fetch(url, {
        method: "POST",
        headers: {'content-type':'application/json'},
        body: JSON.stringify(todoDao)
    })

    return response.ok
}

export const deleteTodoByIdAPI = async (deleteId: string): Promise<boolean> => {
    const url = new URL(`${BASE_PATH}/todos/${deleteId}`)

    const response = await fetch(url, {
        method: "DELETE",
        headers: {'content-type':'application/json'},
    })

    return response.ok
}

export const updateTodoAPI = async (todoDao: TodoDao): Promise<boolean> => {
    const url = new URL(`${BASE_PATH}/todos/${todoDao.id}`)

    const response = await fetch(url, {
        method: "PUT",
        headers: {'content-type':'application/json'},
        body: JSON.stringify(todoDao)
    })

    return response.ok
}