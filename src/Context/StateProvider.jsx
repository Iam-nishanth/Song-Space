import React, { createContext, useContext, useReducer } from 'react'
import { initialState } from './reducer'

export const StateContext = createContext()

export const StateProvider = ({ children, intialState, reducer }) => {


    return (<StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider >)

}


export const useStateProvider = () => useContext(StateContext)


