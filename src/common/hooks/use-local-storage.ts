import {useEffect, useRef, useState} from "react";

const useLocalStorage = <T>(key: string, {serializer, deserializer} =  {deserializer: JSON.parse, serializer: JSON.stringify}) => {
    const keyRef = useRef(key)

    // @ts-ignore
    const [value, setValue] = useState<T>(deserializer<T>(
        localStorage.getItem(keyRef.current)
    ))

    useEffect(() => {
        localStorage.setItem(keyRef.current, serializer(value))
    }, [serializer, value])

    return [value, setValue]
}

export default useLocalStorage