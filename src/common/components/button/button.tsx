import {PropsWithChildren} from "react";

type Props = PropsWithChildren&{
    type: 'submit' | 'reset'
    disabled?: boolean
    onClick?: () => void
}

const Button = ({children, type, disabled, onClick}: Props) => {
    return (
        <div>
            <button disabled={disabled} onClick={onClick} className={
                "ease-out duration-200 hover:ease-in focus:ease-in " +
                "bg-primary border-2 rounded-lg px-6 py-2 border-slate-400 " +
                "uppercase font-bold text-slate-500 " +
                "hover:text-slate-100 hover:bg-blue-500 " +
                "disabled:border-slate-200 disabled:text-slate-200 " +
                "focus:text-slate-100 focus:border-blue-500 focus:bg-blue-500 focus:outline-none"} type={type}>{children}</button>
        </div>
    )
}

export default Button