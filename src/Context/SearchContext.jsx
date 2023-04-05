import React, { createContext, useContext, useState } from 'react'

export const SearchContext = createContext()

export const SearchProvider = ({ children }) => {
    const [searchOpen, setSearchOpen] = useState(false);

    return (<SearchContext.Provider value={{ setSearchOpen, searchOpen }}>
        {children}
    </SearchContext.Provider >)

}


export const useSearchContext = () => useContext(SearchContext)