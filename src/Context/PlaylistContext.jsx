import React, { createContext, useContext, useState } from 'react'

export const PlaylistContext = createContext()

export const PlaylistProvider = ({ children }) => {
    const [CreateOpen, setCreateOpen] = useState(false);

    return (<PlaylistContext.Provider value={{ CreateOpen, setCreateOpen }}>
        {children}
    </PlaylistContext.Provider >)

}


export const usePlaylistContext = () => useContext(PlaylistContext)