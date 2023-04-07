import React from 'react'
import { FaSearch } from 'react-icons/fa'
import styled from 'styled-components'
import { useStateProvider } from '../../Context/StateProvider'
import { Anchor, Container, Image, Span, User } from '../../Styles/NavbarStyles'

const Navbar = ({ navBackground }) => {

    const [{ userInfo }, dispatch] = useStateProvider()
    // console.log(userInfo)

    return (
        <Container navBackground={navBackground}>
            <User>
                <Anchor target='_blank' href='https://www.spotify.com/in-en/account/overview/' key={userInfo?.userUrl}>
                    <Image src={userInfo?.image} />
                    <Span>{userInfo?.name}</Span>
                </Anchor>
            </User>
        </Container>
    )
}



export default Navbar