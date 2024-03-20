import {ProjectDao} from "../../data/project.ts";
import {formatDate} from "../../../common/utils/date.ts";

type Props = {
    projects: ProjectDao
    onClickProject: (projectId: string) => void
}

const ProjectsList = ({projects, onClickProject}: Props) => {
    return (
        <div className={'grid xl:grid-cols-3 sm:grid-cols-2 justify-items-center gap-4 p-4'}>
            {projects && projects.map((project: ProjectDao) => {
                return (
                    <article onClick={() => onClickProject(project.id)} className={'cursor-pointer p-4 bg-slate-100 w-1/2 rounded flex flex-row gap-4 items-center justify-between hover:bg-slate-300'}>
                        <section className={'overflow-clip'}>
                            <div className={'text-xl capitalize '}>{project.name}</div>
                            <div className={'text-xs'}>{formatDate(project.createdDate)}</div>
                        </section>
                        <section className={'overflow-clip'}>
                            <div className={'text-3xl'}>{project.id}</div>
                        </section>
                    </article>
                )
            })}
        </div>
    )
}

export default ProjectsList