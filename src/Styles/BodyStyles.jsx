import { MdFavorite, MdPlaylistAdd } from "react-icons/md"
import styled from "styled-components"


export const Container = styled.section`
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
`
export const Playlist = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 200px;
    padding: 20px;
    gap: 20px;
`

export const SongList = styled.div``
export const ImgDiv = styled.div``
export const Img = styled.img`
    width: 200px;
    height: 200px;
    object-fit: contain;
`
export const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
    justify-content: flex-end;
    color: #fff;

    `
export const DetailsStrong = styled.strong``
export const DetailsHeading = styled.h1`
    font-size: 40px;
    `
export const DetailsPara = styled.p`
    font-size: 16px;
`
export const Info = styled.div`
margin-left: 15px;
h1 {
    
}p {
    
}`
export const InfoHeading = styled.h3`
    font-size: 16px;
`
export const InfoPara = styled.p`
    font-size: 14px;
    margin-top: 3px;
    color: gray;
`
export const Col1 = styled.div`
    display: flex;
    align-items: center;
    
    `
export const Album = styled.img`
    height: 45px;
  width: 45px;
`
export const Fav = styled(MdFavorite)`
        font-size: 25px;
        opacity: 0;
        &:hover{
            ${Info}{
                opacity: 0.;
            }
            color: #66ff66;
        }
    `
export const Add = styled(MdPlaylistAdd)`
    font-size: 28px;
        opacity: 0;
        &:hover{
            ${Info}{
                opacity: 0.;
            }
            color: #66ff66;
        }
`
export const SongRow = styled.div`
    margin-left: 20px;
    padding: 20px 0;
    display: flex;
    align-items: center;
    z-index: 100;
    color: white;
    width: 100%;
    justify-content: space-between;

    &:hover {
    cursor: pointer;
    background-color: black;
    opacity: 0.8;
    ${Fav}{
        opacity: 1;
    }
    ${Add}{
        opacity: 1;
    }
}
`
export const Duration = styled.div`
    display: flex;
    margin-right: 40px;
    justify-content: space-between;
    width: 150px;
    align-items: center;
    `
export const DurationPara = styled.p``
export const Delete = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    svg{
        cursor: pointer;
        transition: 200ms all ease-in-out;
        &:hover{
            opacity: 0.5;
        }
    }
    svg:first-child{
        font-size: 50px;
        color: #66ff66;
    }
    svg:nth-child(2){
        font-size: 25px;
        &:hover{
            color: red;
        }
    }
    `
