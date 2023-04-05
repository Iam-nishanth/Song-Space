import React, { createContext, useContext, useState } from 'react'

export const FavouritesContext = createContext()

export const FavouriteProvider = ({ children }) => {
    const [favOpen, setFavOpen] = useState(false);

    return (<FavouritesContext.Provider value={{ setFavOpen, favOpen }}>
        {children}
    </FavouritesContext.Provider >)

}


export const useFavoritesContext = () => useContext(FavouritesContext)