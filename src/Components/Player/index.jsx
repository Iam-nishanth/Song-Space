import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Sidebar from '../Sidebar/index'
import Navbar from '../Navbar/index'
import Playing from '../Playing/index'
import Body from '../Body/index'
import { useStateProvider } from '../../Context/StateProvider'
import axios from 'axios'
import SearchResult from '../Search'
import { useSearchContext } from '../../Context/SearchContext'
import { Conatainer, Content, CurrentPlaying, Wrapper, WrapperBody } from '../../Styles/PlayerStyels'
import MobileSidebar from '../SidebarMobile'

const Player = () => {
    const [{ token }, dispatch] = useStateProvider()
    const { searchOpen } = useSearchContext();

    const [isOpen, setIsOpen] = useState(false)


    const bodyRef = useRef()
    const [navBackground, setNavBackground] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    const bodyScrolled = () => {
        bodyRef.current.scrollTop >= 30
            ? setNavBackground(true)
            : setNavBackground(false)
    }

    useEffect(() => {
        const getUserInfo = async () => {
            const { data } = await axios.get("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            });
            const userInfo = {
                userId: data?.id,
                userUrl: data?.external_urls.spotify,
                name: data?.display_name,
                image: data?.images[0].url
            };
            dispatch({ type: 'SET_USER', userInfo });
        };
        getUserInfo();
    }, [dispatch, token]);
    useEffect(() => {
        const getPlaybackState = async () => {
            const { data } = await axios.get("https://api.spotify.com/v1/me/player", {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            });
            dispatch({
                type: 'SET_PLAYER_STATE',
                playerState: data.is_playing,
            });
        };
        getPlaybackState();
    }, [dispatch, token]);




    return (
        <Conatainer>
            <Wrapper>
                <Sidebar />
                <MobileSidebar isOpen={isOpen} toggle={toggle} />
                <WrapperBody ref={bodyRef} onScroll={bodyScrolled}>
                    <Navbar navBackground={navBackground} isOpen={isOpen} toggle={toggle} />
                    <Content>
                        {searchOpen ? <SearchResult /> : <Body />}
                    </Content>
                </WrapperBody>
            </Wrapper>
            <CurrentPlaying>
                <Playing />
            </CurrentPlaying>
        </Conatainer>
    )
}



export default Player