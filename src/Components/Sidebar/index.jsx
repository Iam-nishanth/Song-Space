import React from 'react'
import styled from 'styled-components'
import { MdHomeFilled, MdSearch } from 'react-icons/md'
import { VscLibrary } from 'react-icons/vsc'
import Playlists from '../Playlists'

const Sidebar = () => {



    return (
        <Container>
            <Logo>SongSpace</Logo>
            <Links>
                <Link><MdHomeFilled /><span>Home</span></Link>
                <Link><MdSearch /><span>Search</span></Link>
                <Link><VscLibrary /><span>Library</span></Link>
            </Links>
            <Strong>PLAYLISTS</Strong>
            <HR />
            <Playlists />
        </Container>
    )
}
const Container = styled.section`
    background: #000;
    color: #ccc;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;

`
const Logo = styled.h1`
    font-size: 40px;
    font-family: 'Allura',cursive;
    padding: 15px 20px;
    transition: 0.2s scale ease-in-out;
    background: #66FF66;
    background: linear-gradient(to right, #00ffff 0%, #66FF66 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    &:hover {
        scale: 1.1;
    }
`
const Links = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 15px;

`
const Link = styled.h4`
    
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    font-weight: 400;
    svg{
        font-size: 25px;
    }
    &:hover {
        color: #999;
    }
`
const Strong = styled.strong`
    padding-bottom: 10px;
    padding-left: 10px;
    color: #fff;
`
const HR = styled.hr`
    padding: 10px 0;
    border: none;
    border-top: 1px solid;
`
export default Sidebar