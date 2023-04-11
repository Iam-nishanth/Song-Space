import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
`
export const Items = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap:30px;
    justify-content: center;
`
export const Item = styled.div`
    width: 200px;
    height: auto;
    cursor: pointer;
    &:hover{
        opacity: 0.2;
    }
`
export const ItemH3 = styled.h3``
export const ItemImage = styled.div``
export const Img = styled.img`
    width: 100%;
    object-fit: contain;
`

export const Heading = styled.h1`
    font-size: 40px;
    color: #fff;
    padding: 20px 0;
`