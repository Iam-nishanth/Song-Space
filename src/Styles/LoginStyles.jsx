import styled from "styled-components"

export const Container = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    gap: 40px;
    text-align: center;
`
export const Heading = styled.h1`
    font-size: 160px;
    font-family: 'Allura',cursive;
    color: #66ff66;
    @media (max-width: 730px){
        font-size: 120px;
    }
    @media (max-width: 450px){
        font-size: 90px;
    }
    @media (max-width: 350px){
        font-size: 75px;
    }
    
`
export const Para = styled.p`
    font-size: 25px;
    font-family: inherit;
    color: #999;
    @media (max-width: 730px){
        font-size: 22px;
    }
    @media (max-width: 450px){
        font-size: 16px;
    }
`

export const Button = styled.button`
    cursor: pointer;
    margin: 0;
    position: relative;
    font-family: sans-serif;
    font-weight: 700;
    border-radius: 30px;
    overflow: hidden;
    background: #000;
    color: #000;
    border: 1px solid #66ff66;

    width: 300px;
    min-height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;

    & span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: color 0.4s;
    font-size: 20px;
    }
    svg{
        font-size: 30px;
    }
    
    &:hover span {
    color: #66ff66;

    }

    &::before,
    &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    }

    &::before {
    content: "";
    background: #66ff66;
    width: 120%;
    left: -10%;
    transform: skew(30deg);
    transition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);
    }

    &:hover::before {
    transform: translate3d(100%, 0, 0);
    }
    @media (max-width: 730px){
        width: 250px;
        /* height: 40px; */
    }
`