import {useEffect, useRef, useState} from "react";

const useLocalStorage = <T>(key: string, {serializer, deserializer} =  {deserializer: JSON.parse, serializer: JSON.stringify}) => {
    const keyRef = useRef(key)

    const [value, setValue] = useState<T>( () => {
        try {
            return deserializer(
                localStorage.getItem(keyRef.current)
            )
        } catch (e) {
            return {} as T
        }
    })

    useEffect(() => {
        localStorage.setItem(keyRef.current, serializer(value))
    }, [serializer, value])

    return [value, setValue]
}

export default useLocalStorage