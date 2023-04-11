import styled from "styled-components"

export const Container = styled.div`
    /* border-radius: 30px; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
export const Items = styled.div`

    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    gap: 30px;
    align-items: center;
    justify-content: center;
`
export const Item = styled.div`
    background: rgba(255,255,255,0.12);
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    cursor: pointer;
    width: 150px;
    &:hover{
        opacity: 0.2;
        transition: 300ms all ease-in-out ;
    }
`
export const ItemDetails = styled.div`
    width: 100%;
    height: 80px;
`

export const ItemH1 = styled.h1``
export const ItemPara = styled.p``
export const ImageDiv = styled.div`
    width: 100%;
    height: 150px;
`
export const H1 = styled.strong`
    font-size: 25px;
    padding-top: 20px;
    padding-bottom: 6px;
    `
export const Hr = styled.hr`
    width: 80%;
    border: none;
    border-top: 1px solid #999;
    padding-bottom: 20px;
`
export const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`
export const Form = styled.form`
    width: 100%;
    max-width: 500px;
    height: 50px;
    display: flex;
    background-color: transparent;
    align-items: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    position: relative;
`
export const FormInput = styled.input`
    width: 100%;
    height: 100%;
    border-radius: 30px;
    padding: 5px 25px;
    font-size: 16px;
`
export const FormButton = styled.button`
    /* color: #fff; */
    width: 40px;
    height: 100%;
    background-color: transparent;
    outline: none;
    border: none;
    display: flex;
    align-items: center;
    padding-left: 10px;
    svg{
        font-size: 30px;
    }
    position: absolute;
    right: 20px;
    z-index: 10;
    cursor: pointer;
`