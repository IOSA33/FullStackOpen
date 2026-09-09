import { createContext, useState } from "react"

const CounterContext = createContext()

export default CounterContext

export const CounterContextProvider = (props) => {
    const [message, setMessage] = useState("")

    return (
        <CounterContext.Provider value={{ message, setMessage }}>
            {props.children}
        </CounterContext.Provider>
    )
}