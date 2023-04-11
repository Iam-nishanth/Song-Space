import styled from "styled-components"

export const Container = styled.div`
    color: #ccc;
    height: 100%;   
`
export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 15px;
    height: 50vh;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar{
        width: 10px;
        &-thumb{
            background-color: #cccccc25;
        }
    }
`
export const Para = styled.p`
    font-size: 14px;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    &:hover{
        color: #999;
    }
`