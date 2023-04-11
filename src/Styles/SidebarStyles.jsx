import styled from "styled-components"


export const Container = styled.section`
    background: #000;
    color: #ccc;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    /* display: none; */
    @media (max-width: 730px){
        /* opacity: 0; */
        display: none;
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
`
export const Links = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 15px;

`
export const Anchor = styled.a`
    
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    font-weight: 400;
    color: #fff;
    svg{
        font-size: 25px;
    }
    &:hover {
        color: #999;
    }
`
export const Strong = styled.strong`
    padding-bottom: 10px;
    padding-left: 10px;
    color: #fff;
`
export const HR = styled.hr`
    padding: 10px 0;
    border: none;
    border-top: 1px solid;
`