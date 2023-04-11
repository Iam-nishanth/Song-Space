import React from 'react'
import styled from 'styled-components'
import { Container } from '../../Styles/PlayingStyles'
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


export default Playing