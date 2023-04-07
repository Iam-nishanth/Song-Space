import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    svg{
        color: #999;
        transition: 0.3s ease-in-out;
        cursor: pointer;
        &:hover{
            color: #66ff66;
        }
    }
`
export const Shuffle = styled.div` font-size:20px ;`
export const Prev = styled.div` font-size:30px ;`
export const PausePlay = styled.div` 
        svg{
            font-size:50px ;
            color: #66ff66;
            &:hover{
                color: #fff;
            }
        }
            
`
export const Next = styled.div` font-size:30px ;`
export const Repeat = styled.div` font-size:20px ;`