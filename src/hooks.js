import { useState, useEffect} from "react";
import axios  from "axios";
import { v4 as uuid } from "uuid";

function useFlip(initialFlipState = true) {
    const [isFlipped, setFLipped] = useState(initialFlipState)

    const flip = () => {
        setFLipped(isUp => !isUp)
    }
    return [isFlipped, flip];
}

function useAxios(keyInLS, baseUrl) {
    const [responses, setResponses] = useLocalStorage(keyInLS)
    const addResponseData = async () => {
        const response = await axios.get(`${baseUrl}`);
        setResponses(responses => [...responses, {...response.data, id:uuid()}])
    }
    
    return [responses, addResponseData]
}

function useLocalStorage(key, initialValue = []) {
    if (localStorage.getItem(key)) {
        initialValue = JSON.parse(localStorage.getItem(key));
    }
    const [value, setValue] = useState(initialValue)
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])
    return [value, setValue]
}

export { useFlip, useAxios, useLocalStorage}