import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    height: 100%;
    gap: 30px;    
`
export const Heading = styled.h1`
    font-size: 60px;
`
export const Input = styled.input`
    height: 50px;
    border-radius: 30px;
    padding: 25px;
    width: 400px;
    font-size: 16px;
    font-weight: 600;
    font-family: inherit;
`
export const Button = styled.button`
        width: 200px;
        height: 50px;
        border-radius: 40px;
        background-color: #66ff66;
        font-family: inherit;
        font-size: 14px;
        font-weight: 600;
        transition: 300ms all ease-in-out;
        &:hover{
            background-color: #999;
        }
`