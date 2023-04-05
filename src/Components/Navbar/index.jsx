import React from 'react'
import { FaSearch } from 'react-icons/fa'
import styled from 'styled-components'
import { useStateProvider } from '../../Context/StateProvider'

const Navbar = ({ navBackground }) => {

    const [{ userInfo }, dispatch] = useStateProvider()
    // console.log(userInfo)

    return (
        <Container navBackground={navBackground}>
            <User>
                <Anchor key={userInfo?.userUrl}>
                    <img src={userInfo?.image} />
                    <span>{userInfo?.name}</span>
                </Anchor>
            </User>
        </Container>
    )
}

const Container = styled.section`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 20px;
    height: 80px;
    position: sticky;
    top: 0;
    transition: 0.3s ease-in-out;
    background: ${({ navBackground }) => navBackground ? 'rgba(0,0,0,0.7)' : 'none'};
`
const Search = styled.div`
    background-color: #fff;
    width: 350px;
    height: 30px;
    padding: 4px 15px;
    border-radius: 18px;
    display: flex;
    align-items: center;
    svg{
        color: black;
        padding: 5px;
    }
`
const Input = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-size:14px;
`
const User = styled.div`
    display: flex;
    align-items: center;
`
const Anchor = styled.a`
    text-decoration: none;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 10px;
    img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    
`

export default Navbar