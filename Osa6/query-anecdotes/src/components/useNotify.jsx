import { useContext } from "react"
import CounterContext from "./CounterContext"

const useNotify = () => useContext(CounterContext)

export default useNotify