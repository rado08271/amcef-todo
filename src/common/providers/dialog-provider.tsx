import {Component, createContext, PropsWithChildren, useMemo, useRef, useState} from "react";
import {createReducer} from "@reduxjs/toolkit";
import {string} from "zod";
import Button from "../components/button/button.tsx";

export const DialogContext = createContext()

const DialogProvider = ({children}: PropsWithChildren) => {
    const [isOpened, setIsOpened] = useState(false)
    const [renderedDialog, setDialog] = useState<Component>(<></>)
    const backdrop = useRef()

    const openDialog = (component: Component) => {
        setDialog(component)
        setIsOpened(true)
    }

    const closeDialog = () => {
        setIsOpened(false)
    }

    return (
        <DialogContext.Provider value={{openDialog, closeDialog}}>
            { /* Unmount when not necessary */ }
            {isOpened && <section ref={backdrop} className={'fixed z-50 top-0 left-0 bottom-0 right-0 backdrop-blur backdrop-brightness-50'} onClick={event => {
                /* this ensures that when clicking on backdrop it will close - will be always captured when dialog is mounted */
                if (event.target === backdrop.current) closeDialog()
            }}>
                <section className={'z-50 top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 bg-slate-100 sm:w-1/3 sm:h-1/3 xl:w-1/3 xl:h-1/3 sm:rounded-t-xl shadow-xl absolute'}>
                    {renderedDialog}
                    <section className={'w-full bg-slate-300 flex justify-end sm:rounded-b-xl'}>
                        <Button type={'reset'} onClick={closeDialog}>OK</Button>
                    </section>
                </section>
            </section>}
            {children}
        </DialogContext.Provider>
    )
}

export default DialogProvider