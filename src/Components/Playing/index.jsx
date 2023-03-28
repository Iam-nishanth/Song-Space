import React from 'react'
import styled from 'styled-components'
import CurrentSong from '../CurrentSong'
import PlayerControls from '../PlayerControls'

const Playing = () => {
    return (
        <Container>
            <CurrentSong />
            <PlayerControls />
        </Container>
    )
}

const Container = styled.footer`
    background-color: #181818;
    height: 100%;
    width: 100%;
    border-top: 1px solid #282828;
    
    display: grid;
    grid-template-columns: 2fr 2fr;
    align-items: center;
    justify-content: center;
`
export default Playing