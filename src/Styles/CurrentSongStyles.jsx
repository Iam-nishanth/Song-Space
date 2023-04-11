import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    flex: 1;
`
export const Img = styled.img`
    width: 60px;
    height: auto;
    object-fit: contain;
`
export const Track = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    padding-left: 20px;
    @media (max-width: 500px){
        padding-left: 5px;
    }
`
export const TrackImage = styled.div``
export const Info = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;

    `
export const InfoH1 = styled.h3`
    color: #fff;
    @media (max-width: 500px){
        font-size: 14px;
    }
    `
export const InfoPara = styled.h4`
    color: #999;
    @media (max-width: 500px){
        font-size: 12px;
    }
`