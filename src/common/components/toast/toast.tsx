import {PropsWithChildren, useEffect, useState} from "react";

type Props = PropsWithChildren&{
    onInvisible: () => void
}

const Toast = ({children, onInvisible}: Props) => {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setVisible(false)
            onInvisible()
        }, 2000)
    }, [onInvisible])

    return (
        <div className={visible ? 'visible' : 'invisible'}>
            <div
                className={'fixed bottom-5 right-5 duration-200 ease-in-out w-1/3 border-b-8 bg-slate-100 border-red-500 shadow-2xl p-8 rounded-xl flex flex-row gap-4 justify-around'}>
                <div>i</div>
                <div className={'flex-1'}>{children}</div>
            </div>
        </div>
    )
}

export default Toast