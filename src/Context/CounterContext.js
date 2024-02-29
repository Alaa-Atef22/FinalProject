import { createContext } from "react"; 

export let CounterContext= createContext()
export default function CounterContextProvider(props) {
let x=9;
let y=12;

return <CounterContext.Provider  value={{x,y}}>
{props.children}
</CounterContext.Provider>
  }
