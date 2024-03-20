import {useEffect} from "react";
import useDispatch from "../../../common/hooks/use-dispatch.ts";
import TodosList from "../../ui/lists/todos-list.tsx";
import TodosForm from "../../ui/forms/todos-form.tsx";
import {TodoDao} from "../../data/todo.ts";
import {useParams} from "react-router-dom";
import useLocalStorage from "../../../common/hooks/use-local-storage.ts";
import {useSelector} from "react-redux";
import {
    createTodoAction, deleteTodoAction,
    getAllProjectTodosAction, getAllProjectTodosLoadingSelector,
    getAllProjectTodosSelector, updateTodoAction
} from "../../redux/todo-reducer.ts";

const Project = () => {
    const { id } = useParams();

    const [todos, setTodos] = useLocalStorage<TodoDao[]>('todos')

    const allProjectTodos = useSelector(getAllProjectTodosSelector)
    const projectTodosLoading = useSelector(getAllProjectTodosLoadingSelector)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllProjectTodosAction(id))
    }, [dispatch, id]);

    useEffect(() => {
        if (allProjectTodos) { // @ts-ignore
            setTodos(allProjectTodos as TodoDao[])
        }
    }, [setTodos, allProjectTodos]);

    const createTodo = (todo: TodoDao) => {
        todo.projectId = id
        dispatch(createTodoAction(todo))

        /* Add to list optimisticaly */
        // @ts-ignore
        setTodos([...todos, todo])
    }

    const updateTodo = (newTodo: TodoDao) => {
        dispatch(updateTodoAction(newTodo))

        /* Add to list optimisticaly */
        // @ts-ignore
        setTodos([...todos.filter(todo => todo.id !== newTodo.id), newTodo])
    }

    const deleteTodo = (todoId: string) => {
        dispatch(deleteTodoAction(todoId))

        /* Handle list optimisticaly */
        // @ts-ignore
        setTodos(todos.filter(todo => todo.id !== todoId))
    }

    return (
        <section className={'flex flex-col gap-4 w-full'}>
            {
                !projectTodosLoading ? <TodosList todos={todos as TodoDao[]}
                   onUpdateName={(newValue, todo) => {
                       console.log('update', todo, newValue)

                       const nameUpdatedTodo = {...todo, name: newValue}
                       updateTodo(nameUpdatedTodo)
                   }}
                   onUpdateState={(newState, todo) => {
                       const stateUpdatedTodo = {...todo, finished: newState}
                       updateTodo(stateUpdatedTodo)
                   }}
                   onDelete={deleteTodo}
                /> : <div className={'text-white text-center p-4 lowercase text-xs'}>...loading...</div>
            }
            {todos != null && todos.length === 0 &&
                <div className={'flex justify-center'}>
                    <div className={'text-center text-sm uppercase py-2 px-6 rounded-xl bg-slate-200'}>
                        No todos yet, type your first one below
                    </div>
                </div>
            }
            <TodosForm loading={projectTodosLoading} onTodoSubmit={createTodo}/>
        </section>
    )
}

export default Project