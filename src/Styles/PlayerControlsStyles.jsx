import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    flex: 1.5;
    svg{
        color: #999;
        transition: 0.3s ease-in-out;
        cursor: pointer;
        &:hover{
            color: #66ff66;
        }
    }
    @media (max-width: 550px){
    gap: 10px;
    flex: .5;
 }
`
export const Shuffle = styled.div`
 font-size:20px ;
 @media (max-width: 550px){
    display: none;
 }
 `
export const Prev = styled.div` 
font-size:30px ;
@media (max-width: 500px){
        font-size: 20px;
    }
`
export const PausePlay = styled.div` 
        svg{
            font-size:50px ;
            color: #66ff66;
            &:hover{
                color: #fff;
            }
            @media (max-width: 500px){
                font-size: 45px;
            }
        }
            
`
export const Next = styled.div`
 font-size:30px ;
 @media (max-width: 500px){
        font-size: 20px;
    }
 `
export const Repeat = styled.div`
 font-size:20px ;
 @media (max-width: 550px){
    display: none;
 }
`