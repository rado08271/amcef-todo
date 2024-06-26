import useLocalStorage from "../../../common/hooks/use-local-storage.ts";
import {useNavigate} from "react-router-dom";
import ProjectsList from "../../ui/lists/projects-list.tsx";
import ProjectForm from "../../ui/forms/project-form.tsx";
import useSelector from "../../../common/hooks/use-selector.ts";
import {
    allProjectsSelector,
    createProjectAction,
    getAllProjectsAction
} from "../../redux/project-reducer.ts";
import {ProjectDao} from "../../data/project.ts";
import useDispatch from "../../../common/hooks/use-dispatch.ts";
import {useEffect} from "react";
import useDialog from "../../../common/hooks/use-dialog.ts";
import Button from "../../../common/components/button/button.tsx";

const Dashboard = () => {
    const [projects, setProjects] = useLocalStorage<ProjectDao[]>("projects")

    const allProjects = useSelector(allProjectsSelector)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { openDialog, closeDialog } = useDialog()

    useEffect(() => {
        dispatch(getAllProjectsAction())
    }, [dispatch]);

    useEffect(() => {
        if (allProjects) {
            // @ts-expect-error will be handled as error due to types infering
            setProjects(allProjects)
        }
    }, [setProjects, allProjects]);

    const createProjectFunction = (project: ProjectDao) => {
        dispatch(createProjectAction(project))

        /* Update optimistically */
        // @ts-expect-error will be handled as error due to types infering
        setProjects([...allProjects, project])
        closeDialog()
    }

    const openProject = (projectId: string) => {
        navigate(`/project/${projectId}`)
    }

    return (
        <section className={'flex flex-col w-full m-8'}>
            {projects != null && projects.length === 0 &&
                <div className={'flex justify-center'}>
                    <div className={'text-center text-sm uppercase py-2 px-6 rounded-xl bg-slate-200'}>
                        <p>You have no projects yet, click <strong>+ | Add</strong> to create your first project</p>
                    </div>
                </div>
            }

            <div>
                <ProjectsList projects={projects as ProjectDao[]} onClickProject={openProject}/>
            </div>

            <div className={'flex justify-center'}>
                <Button onClick={()=> {
                    openDialog(
                        (
                            <div className={'p-4 w-full h-full flex flex-col justify-center items-center'}>
                                <h1 className={'text-center'}>What is the name of your new project?</h1>
                                <ProjectForm onProjectSubmit={createProjectFunction}></ProjectForm>
                            </div>
                        )
                    )
                }
                } type={"submit"}>+
                </Button>
            </div>

        </section>
    )
}

export default Dashboard;