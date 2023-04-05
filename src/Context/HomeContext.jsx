import React, { createContext, useContext, useState } from 'react'

export const HomeContext = createContext()

export const HomeProvider = ({ children }) => {
    const [homeOpen, setHomeOpen] = useState(false);

    return (<HomeContext.Provider value={{ homeOpen, setHomeOpen }}>
        {children}
    </HomeContext.Provider >)

}


export const useHomeContext = () => useContext(HomeContext)