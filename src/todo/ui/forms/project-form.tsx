import {useForm} from "react-hook-form";
import Input from "../../../common/components/input/input.tsx";
import Button from "../../../common/components/button/button.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {ProjectDao, ProjectScheme} from "../../data/project.ts";
import {z} from "zod";

type Props = {
    onProjectSubmit: (project: ProjectDao) => void
}

const ProjectFormScheme = ProjectScheme.pick({ name: true })
type ProjectFormDao = z.infer<typeof ProjectFormScheme>

const ProjectForm = ({onProjectSubmit}: Props) => {
    const { register, handleSubmit } = useForm({
        resolver: zodResolver(ProjectFormScheme)
    })

    const createProject = (projectForm: ProjectFormDao) => {
        const project: ProjectDao = {
            id: '11',
            name: projectForm.name,
            searchString: projectForm.name.toLowerCase().trim().replace(" ", ''),
            createdDate: new Date(),
        }

        onProjectSubmit(project)
    }

    return (
        <article>
            <form className={'w-full flex gap-2'} onSubmit={handleSubmit(createProject)}>
                <Input register={register} id={'name'} placeholder={'Your awesome todo list name'}/>
                <Button type={"submit"}>+</Button>
            </form>
        </article>
    )
}

export default ProjectForm