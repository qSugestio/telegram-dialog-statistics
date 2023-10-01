import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react'
import IAdvancedUserData from 'types/IAdvancedUserData'

type MyContextData = {
  data: IAdvancedUserData
  setData: Dispatch<SetStateAction<IAdvancedUserData>>
}

export const Context = createContext<MyContextData>({} as MyContextData)

type ContextProviderProps = {
  children: ReactNode
}

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [data, setData] = useState<IAdvancedUserData>({} as IAdvancedUserData)

  return (
    <Context.Provider value={{ data, setData }}>{children}</Context.Provider>
  )
}
