import {createContext, PropsWithChildren, useState} from "react";
import Toast from "../components/toast/toast.tsx";

export const ToastContext = createContext({
    addToast: (value: string) => {value}
})

const ToastProvider = ({children}: PropsWithChildren) => {
    const [toast, setToast] = useState<string | null>(null)

    const addToast = async (value: string) => {
        setToast(value)
    }

    return (<ToastContext.Provider value={{addToast}}>
        {children}
        {toast && <Toast onInvisible={() => setToast(null)}>{toast}</Toast>}
    </ToastContext.Provider>)
}

export default ToastProvider