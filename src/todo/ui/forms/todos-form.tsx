import {TodoDao, TodoScheme} from "../../data/todo.ts";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Input from "../../../common/components/input/input.tsx";
import Button from "../../../common/components/button/button.tsx";
import {useEffect} from "react";
import {normalizeSearchString} from "../../../common/utils/string.ts";
import useToast from "../../../common/hooks/use-toast.ts";

type Props = {
    onTodoSubmit: (todo: TodoDao) => void
    loading: boolean
}

const TodoFormScheme = TodoScheme.pick({
    name: true,
    description: true,
    deadlineDate: true
})
type TodoFormDao = z.infer<typeof TodoFormScheme>


const TodosForm = ({onTodoSubmit, loading}: Props) => {
    // @ts-ignore
    const {addToast} = useToast()

    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: zodResolver(TodoFormScheme),
        shouldFocusError: false
    })

    useEffect(() => {
        if (errors.name) {
            addToast(`Todo Name: ${errors.name.message}`)
        }

        if (errors.deadlineDate) {
            addToast(`Todo Deadline: ${errors.deadlineDate.message}`)
        }
    }, [errors])

    const createTodo = (todoForm: TodoFormDao) => {
        // @ts-ignore
        const todo: TodoDao = {
            name: todoForm.name,
            description: todoForm.description,
            searchString: normalizeSearchString(todoForm.name),
            createdDate: new Date(),
            deadlineDate: todoForm.deadlineDate,
            finished: false,
        }

        onTodoSubmit(todo)
    }

    // @ts-ignore
    return (
        <section>
            <form className={'w-full flex gap-2'} onSubmit={handleSubmit(createTodo)}>
                <Input disabled={loading} register={register} id={'name'} placeholder={'My awesome activity'}/>
                <Input disabled={loading} register={register} id={'description'} placeholder={'This is my description'}/>
                <Input disabled={loading} required register={register} id={'deadlineDate'} type={'future'} placeholder={"2024-04-03"}/>
                <Button type={"submit"}>+</Button>
            </form>
        </section>
    )
}

export default TodosForm