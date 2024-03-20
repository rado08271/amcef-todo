import {ProjectDao} from "../data/project.ts";

const BASE_PATH = import.meta.env.VITE_BASE_PATH
export const createProjectAPI = async (projectDao: ProjectDao): Promise<boolean> => {
    const url = new URL(`${BASE_PATH}/projects`)

    const response = await fetch(url, {
        method: "POST",
        headers: {'content-type':'application/json'},
        body: JSON.stringify(projectDao)
    })

    return response.ok
}

export const getProjectsAPI = async (): Promise<ProjectDao[]> => {
    const url = new URL(`${BASE_PATH}/projects`)

    const response = await fetch(url, {
        method: "GET"
    })

    return await response.json()
}