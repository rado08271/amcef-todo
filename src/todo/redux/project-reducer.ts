import {ReducerState} from "../../common/context/typs.ts";
import {ProjectDao} from "../data/project.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createProjectAPI, getProjectsAPI} from "../api/project-repository.ts";

type ProjectState = ReducerState<ProjectDao[] | ProjectDao>

const ProjectInitialState: ProjectState = {
    data: null,
    errors: [],
    status: "idle"
}

const createProjectAction = createAsyncThunk<boolean, ProjectDao>('project/create', async (project) => {
    const response = await createProjectAPI(project)

    return response
})

const getAllProjectsAction = createAsyncThunk<ProjectDao[], void>('project/get', async () => {
    const response = await getProjectsAPI()

    return response
})

const ProjectSlice  = createSlice<ProjectState>({
    name: "project",
    initialState: ProjectInitialState,
    extraReducers: (builder) => {
        builder.addCase(createProjectAction.pending, (state, action) => {
            state.status = "loading"
            state.name = action.type
        })
        builder.addCase(createProjectAction.fulfilled, (state, action) => {
            state.status = "success"
            state.status = action.payload
            state.name = action.type
        })
        builder.addCase(createProjectAction.rejected, (state, action) => {
            state.status = "failed"
            state.name = action.type
        })
        builder.addCase(getAllProjectsAction.pending, (state, action) => {
            state.status = "loading"
            state.name = action.type
        })
        builder.addCase(getAllProjectsAction.fulfilled, (state, action) => {
            state.status = "success"
            state.data = action.payload
            state.name = action.type
        })
        builder.addCase(getAllProjectsAction.rejected, (state, action) => {
            state.status = "failed"
            state.data = action.payload
            state.name = action.type
        })

    }
})

const projectWasCreatedSelector = (state: ProjectState) => state.status === 'success'
const allProjectsSelector = ({project}: { project: ProjectState }) => {
    return project.data
}

export default ProjectSlice.reducer

export {
    createProjectAction,
    getAllProjectsAction,
    projectWasCreatedSelector,
    allProjectsSelector
}