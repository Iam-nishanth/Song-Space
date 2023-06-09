import React, { useState } from 'react'
import styled from 'styled-components'
import { MdAddBox, MdFavorite, MdHomeFilled, MdSearch } from 'react-icons/md'
import Playlists from '../Playlists'
import { useSearchContext } from '../../Context/SearchContext'
import { useHomeContext } from '../../Context/HomeContext'
import { usePlaylistContext } from '../../Context/PlaylistContext'
import { useFavoritesContext } from '../../Context/FavouritesContext'
import { Anchor, Container, HR, Links, Logo, Strong } from '../../Styles/SidebarStyles'

const Sidebar = ({ toggle }) => {
    const { setSearchOpen, searchOpen } = useSearchContext();
    const { homeOpen, setHomeOpen } = useHomeContext();
    const { createOpen, setCreateOpen } = usePlaylistContext()
    const { favOpen, setFavOpen } = useFavoritesContext();

    const SearchToggle = () => setSearchOpen(prev => !prev)

    const HomeToggle = () => setHomeOpen(prev => !prev)

    const CreatePlaylistToggle = () => setCreateOpen(prev => !prev)

    const CreateFavToggle = () => setFavOpen(prev => !prev)


    return (
        <Container>
            <Logo>SongSpace</Logo>
            <Links>
                <Anchor onClick={HomeToggle} ><MdHomeFilled /><span>Home</span></Anchor>
                <Anchor onClick={SearchToggle} ><MdSearch /><span>Search</span></Anchor>
                <Anchor onClick={CreatePlaylistToggle}><MdAddBox /><span>Create Playlist</span></Anchor>
                <Anchor onClick={CreateFavToggle} ><MdFavorite />Favourites</Anchor>
            </Links>
            <Strong>PLAYLISTS</Strong>
            <HR />
            <Playlists />
        </Container>
    )
}

export default Sidebar