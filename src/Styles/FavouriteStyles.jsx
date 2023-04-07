import { MdDelete } from "react-icons/md"
import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    justify-content: center;
    /* align-items: center; */
    flex-direction: column;
    overflow-x: hidden;
`
export const Details = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    padding: 20px 0 30px 0;

`
export const DetailsHeading = styled.h1`
    font-size: 60px;
    padding-left: 20px;
    display: flex;
    align-items: center;
    color: #66ff66;
    text-decoration: underline;
`
export const Songs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`
export const Col1 = styled.div`
    display: flex;
`
export const Album = styled.img`
    height: 50px;
    width: 50px;
    object-fit: contain;
`
export const Delete = styled(MdDelete)`
    opacity: 0;
    font-size: 25px;
    &:hover{
        color: red;
    }

`
export const SongRow = styled.div`
    padding: 0 30px;
    display: flex;
    align-items: center;
    z-index: 10;
    color: white;
    width: 100%;
    height: 70px;
    justify-content: space-between;
    
    &:hover {
    cursor: pointer;
    background-color: black;
    opacity: 0.8;
        ${Delete}{
            opacity: 1;
        }
    }
`
export const Info = styled.div`
    padding-left: 15px;
`
export const InfoH1 = styled.h1`
    font-size: 16px;
`
export const InfoPara = styled.p`
    font-size: 14px;
    margin-top: 3px;
    color: gray;
`