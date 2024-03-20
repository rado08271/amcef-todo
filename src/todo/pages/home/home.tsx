import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import wait from "../../../common/utils/wait.ts";

const Home = () => {
    const navigate = useNavigate()

    useEffect(() => {
        wait(2500).then(() => navigate('/dashboard'))
    }, [navigate])

    return (
        <section className={'flex flex-col justify-center card-center text-slate-400 text-center'}>
            <h1 className={'text-3xl'}>.welcome to the <span className={'text-teal-600 uppercase bold'}>todo</span> application.</h1>
            <h3 className={'text-md'}>
                <span className={'text-teal-600 uppercase bold'}>todo</span> helps you stay organized and on top of your tasks
                by allowing you to easily add todos.
            </h3>

        </section>
    )
}

export default Home;