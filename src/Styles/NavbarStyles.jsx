import styled from "styled-components"

export const Container = styled.section`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 20px;
    height: 80px;
    position: sticky;
    top: 0;
    transition: 0.3s ease-in-out;
    background: ${({ navBackground }) => navBackground ? 'rgba(0,0,0,0.7)' : 'none'};

    @media (max-width: 730px){
        justify-content: space-between;
    }
`
export const MobileIcon = styled.div`
    display: none;
    transition: .8s all ease;
    cursor: pointer;
    svg{
        font-size: 25px;
    }
    @media screen and (max-width: 730px){
        display: flex;
        align-items: center;
    }
`
export const Logo = styled.h1`
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
    @media (max-width: 430px){
        font-size: 35px;
    }

`
export const Search = styled.div`
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
export const Input = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-size:14px;
`
export const User = styled.div`
    display: flex;
    align-items: center;
`
export const Anchor = styled.a`
    text-decoration: none;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 10px;
    img{
    
    }
    
`
export const Span = styled.h3`
    @media (max-width: 500px){
        display: none;
    }
`
export const Image = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`