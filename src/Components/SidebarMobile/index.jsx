import React, { useState } from 'react'
import styled from 'styled-components'
import { MdAddBox, MdFavorite, MdHomeFilled, MdSearch, MdClose } from 'react-icons/md'
import Playlists from '../Playlists'
import { useSearchContext } from '../../Context/SearchContext'
import { useHomeContext } from '../../Context/HomeContext'
import { usePlaylistContext } from '../../Context/PlaylistContext'
import { useFavoritesContext } from '../../Context/FavouritesContext'
import { Anchor, HR, Links, Logo, Strong } from '../../Styles/SidebarStyles'
import { FaTimes, FaBars } from 'react-icons/fa'

const MobileSidebar = ({ isOpen, toggle }) => {
    const { setSearchOpen, searchOpen } = useSearchContext();
    const { homeOpen, setHomeOpen } = useHomeContext();
    const { createOpen, setCreateOpen } = usePlaylistContext()
    const { favOpen, setFavOpen } = useFavoritesContext();

    const SearchToggle = () => setSearchOpen(prev => !prev)

    const HomeToggle = () => setHomeOpen(prev => !prev)

    const CreatePlaylistToggle = () => setCreateOpen(prev => !prev)

    const CreateFavToggle = () => setFavOpen(prev => !prev)


    return (
        <Container isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <Close />
            </Icon>
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

const Container = styled.section`
    left: ${({ isOpen }) => (isOpen ? '0' : '-100%')}; 
    position: fixed;
    width: 100%;
    background-color: #000;
    height: 100%;
    padding-top: 50px;
    z-index: 10;
    transition: 0.5s ease-in-out;
`
export const Close = styled(FaTimes)`
    color: #fff;
    font-size: 25px;
`
export const Icon = styled.div`
    position: absolute;
    top: 18px;
    right: 20px;
    background: transparent;
    font-size: 35px;
    cursor: pointer;
    outline: none;
`



export default MobileSidebar