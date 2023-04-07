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
export const Span = styled.h3``
export const Image = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`