import styled from "styled-components"

export const Conatainer = styled.section`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: grid;
    grid-template-rows: 680px 1fr;
    &::-webkit-scrollbar{
        width: 10px;
        &-thumb{
            background-color: #cccccc25;
        }
    }
`
export const Wrapper = styled.section`
    display: grid;
    grid-template-columns: 0.5fr  2.5fr;
    width: 100%;
    height: 100%;
    @media (max-width: 730px){
        grid-template-columns:  1fr;
        
    }
`
export const WrapperBody = styled.section`
overflow: auto;
width: 100%;
height: 100%;
&::-webkit-scrollbar{
        width: 10px;
        background: rgba(0,0,0,0.7);
        &-thumb{
            background-color: #cccccc25;
        }
    }

`
export const Content = styled.section`

`
export const CurrentPlaying = styled.section`
    width: 100%;
    
`