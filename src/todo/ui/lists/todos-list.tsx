import {TodoDao} from "../../data/todo.ts";
import {FormEvent, useState} from "react";
import Input from "../../../common/components/input/input.tsx";
import {useForm} from "react-hook-form";
import {DeleteIcon} from "../../../common/components/icons/icons.tsx";
import {formatDate} from "../../../common/utils/date.ts";
import {normalizeSearchString} from "../../../common/utils/string.ts";

type Props = {
    todos: TodoDao[]
    onUpdateName: (newName: string, todo: TodoDao) => void
    onUpdateState: (newState: boolean, todo: TodoDao) => void
    onDelete: (todoId: string) => void
}
const TodosList = ({todos, onUpdateName, onUpdateState, onDelete}: Props) => {
    const [searchQ, setSearchQ] = useState('')
    const [filter, setFilterType] = useState<'all' | 'finished' | 'active'>('all')

    const getStatusColor = (todo: TodoDao) => {
        if (todo.finished) return 'bg-green-100'
        if (todo.deadlineDate < new Date()) return 'bg-red-100'
        return 'odd:bg-slate-100'
    }

    return (
        <table className="text-left w-full table-fixed">
            <thead className={'bg-slate-300 uppercase font-bold text-xs'}>
            <tr>
                <th scope='col' className={'px-6 py-2'}>Name</th>
                <th scope='col' className={'px-6 py-2'}>Description</th>
                <th scope='col' className={'px-6 py-2'}>Deadline</th>
                <th scope='col' className={'px-6 py-2'}>
                    <select name={'options'} tabIndex={0} className={'bg-transparent outline-none uppercase'} onChange={event => {
                        // @ts-ignore
                        setFilterType(event.target.value)
                    }}>
                        <option value={'all'}>All</option>
                        <option value={'finished'}>Finished</option>
                        <option value={'active'}>Active</option>
                    </select>
                </th>
                <th scope='col' className={'px-6 py-2 w-1/6 text-right'}>
                    <Input id={'q'} type={"text"} placeholder={'Search'} onValueChange={qString => {
                        if (qString.length >= 3) setSearchQ(normalizeSearchString(qString))
                        else setSearchQ('')
                    }}/>
                </th>
            </tr>
            </thead>

            <tbody className={'bg-slate-50 font-thin text-base'}>
                {todos != null && todos.length > 0 && todos
                    .slice()
                    .sort((a, b) => {
                        if (a.id > b.id) return 1
                        if (a.id < b.id) return -1
                        return 0
                    })
                    .filter(todo => {
                        switch (filter) {
                            case "finished":    return todo.finished
                            case "active":      return !todo.finished
                            case "all":
                            default             :return true
                        }
                    })
                    .filter(todo => todo.searchString.includes(searchQ))
                    .map((todo: TodoDao) =>
                        <tr className={getStatusColor(todo)} id={todo.id} key={todo.id}>
                            <EditTodo todo={todo} onEditSubmit={({name}) => onUpdateName(name, todo)}/>
                            <th className={'px-6 py-2 overflow-clip'}>{todo.description}</th>
                            <th className={'px-6 py-2'}>{formatDate(todo.deadlineDate.toLocaleString())}</th>
                            <th className={'px-6 py-2 text-ce'}>
                                <input type={'checkbox'} checked={todo.finished}
                                       onChange={event => onUpdateState(event.target.checked, todo)}/>
                            </th>
                            <th className={'px-6 py-2 flex gap-4 justify-end'}>
                                <div onClick={() => onDelete(todo.id)} tabIndex={0}
                                     className={'cursor-pointer fill-black-600 focus:fill-red-600 hover:fill-red-600 ease-in-out duration-200'}>
                                    <DeleteIcon/>
                                </div>
                            </th>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}

const EditTodo = ({todo, onEditSubmit}: { todo: TodoDao, onEditSubmit: (form: { name: string }) => void }) => {
    const {register, handleSubmit} = useForm()
    const [isBeingUpdated, updateForm] = useState(false)

    const onSubmit = (event: FormEvent) => {
        // @ts-ignore
        handleSubmit(onEditSubmit)(event)
        updateForm(false)
    }

    return (
        <th className={'px-6 py-2 cursor-text overflow-clip'}>
            { !isBeingUpdated &&
                <div onClick={() => updateForm(!isBeingUpdated)}>{todo.name}</div>
            }
            { isBeingUpdated &&
                <form onSubmit={onSubmit}>
                    <div><Input register={register} id={'name'} defaultValue={todo.name}/></div>
                </form>
            }
        </th>
    )
}

export default TodosList