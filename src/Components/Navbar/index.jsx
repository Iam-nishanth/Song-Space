import React from 'react'
import { useStateProvider } from '../../Context/StateProvider'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Anchor, Container, Image, Logo, MobileIcon, Span, User } from '../../Styles/NavbarStyles'
import styled from 'styled-components'

const Navbar = ({ navBackground, toggle }) => {

    const [{ userInfo }] = useStateProvider()

    return (
        <Container navBackground={navBackground}>
            <MobileIcon>
                <GiHamburgerMenu onClick={toggle} />
                <Logo>SongSpace</Logo>
            </MobileIcon>
            <User>
                <Anchor target='_blank' href='https://www.spotify.com/in-en/account/overview/' key={userInfo?.userUrl}>
                    <Image title={userInfo?.name} src={userInfo?.image} />
                    <Span>{userInfo?.name}</Span>
                </Anchor>
            </User>
        </Container>
    )
}




export default Navbar