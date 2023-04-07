import React from 'react'
import { FaSpotify } from 'react-icons/fa'
import { LoginFunction } from '../../SpotifyLogin'
import { Button, Container, Heading, Para } from '../../Styles/LoginStyles'

const Login = () => {

    return (
        <Container>
            <Heading>SongSpace</Heading>
            <Para>Please login with your Spotify account to continue</Para>
            <Button onClick={LoginFunction}><span><FaSpotify />LOGIN</span></Button>
        </Container>
    )
}


export default Login