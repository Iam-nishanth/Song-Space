import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { MdSearch } from 'react-icons/md'
import styled from 'styled-components'
import { useStateProvider } from '../../Context/StateProvider';

const SearchResult = () => {
    const [{ token, Searched, selectedPlaylistId }, dispatch] = useStateProvider();
    const [searchResults, setSearchResults] = useState([]);

    const searchKeyRef = useRef('');
    var Something = {}

    const performSearch = async () => {
        try {
            const { data } = await axios.get('https://api.spotify.com/v1/search', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    q: searchKeyRef.current.value,
                    type: ['artist', 'track', 'album'].join(','),
                    limit: 40,
                }
            });
            console.log(data)
            Something = {
                Albums: data.albums.items.map((item) => ({
                    name: item.name,
                    image: item.images[0].url,
                    id: item.id,
                    context_uri: item.uri,
                    artists: item.artists.map((artist) => artist.name),
                })),
                Tracks: data.tracks.items.map((item) => ({
                    name: item.name,
                    image: item.album.images[0].url,
                    id: item.id,
                    context_uri: item.album.uri,
                    artists: item.artists.map((artist) => artist.name)
                })),
                Artists: data.tracks.items.map((item) => ({
                    name: item.name,
                    image: item.album.images[0].url,
                    id: item.id,
                    context_uri: item.album.uri,
                    artists: item.artists.map((artist) => artist.name)
                })),

            };

            setSearchResults(Something);

        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        performSearch();
    }

    const handleInputChange = (event) => {
        searchKeyRef.current.value = event.target.value;
    }

    useEffect(() => {
        if (searchKeyRef.current.value.length > 0) {
            performSearch();
        }
    }, []);


    useEffect(() => {
        dispatch({ type: "SET_SEARCHED", Searched: searchResults });
    }, [searchResults, dispatch]);

    // if (Searched?.Albums) {
    //     Searched.Albums.forEach((album) => {
    //         if (album.name) {
    //             // console.log(album);
    //         }
    //     });
    // }

    const playTrack = async (
        id,
        name,
        artists,
        image,
        context_uri,
    ) => {
        const response = await axios.put(
            `https://api.spotify.com/v1/me/player/play?Active`,
            {
                context_uri,
                offset: {
                    position: 0,
                },
                position_ms: 0,

            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        );
        if (response.status === 204) {
            const currentPlaying = {
                id,
                name,
                artists,
                image,
            };
            dispatch({ type: 'SET_PLAYING', currentPlaying });
            dispatch({ type: 'SET_PLAYER_STATE', playerState: true });
        } else {
            dispatch({ type: 'SET_PLAYER_STATE', playerState: true });
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <input type="text" onChange={handleInputChange} ref={searchKeyRef} />
                <button type="submit"><MdSearch /></button>
            </Form>
            <H1>Albums</H1>
            <Hr />
            <Items>
                {Searched?.Albums?.map(({ name, id, image, context_uri, artists }) =>
                    <Item key={id} onClick={() =>
                        playTrack(
                            id,
                            name,
                            artists,
                            image,
                            context_uri,

                        )
                    }>

                        <ImageDiv>
                            <Img src={image} />
                        </ImageDiv>
                        <h1>{name}</h1>
                        <p>{artists.join(', ')}</p>

                    </Item>)}
            </Items>
            <H1>Artists</H1>
            <Hr />
            <Items>
                {Searched?.Artists?.map(({ name, id, image, context_uri, artists }) =>
                    <Item key={id} onClick={() =>
                        playTrack(
                            id,
                            name,
                            artists,
                            image,
                            context_uri,
                        )
                    }>

                        <ImageDiv>
                            <Img src={image} />
                        </ImageDiv>
                        <h1>{name}</h1>
                        <p>{artists.join(', ')}</p>

                    </Item>)}
            </Items>
            <H1>Tracks</H1>
            <Hr />
            <Items>
                {Searched?.Tracks?.map(({ name, id, image, context_uri, artists }) =>
                    <Item key={id} onClick={() =>
                        playTrack(
                            id,
                            name,
                            artists,
                            image,
                            context_uri,
                        )
                    }>

                        <ImageDiv>
                            <Img src={image} />
                        </ImageDiv>
                        <h1>{name}</h1>
                        <p>{artists.join(', ')}</p>

                    </Item>)}
            </Items>
        </Container>
    );



}
const Container = styled.div`
    /* border-radius: 30px; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const Items = styled.div`

    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    padding: 20px;
    gap: 30px;
`
const Item = styled.div`
    background: rgba(255,255,255,0.12);
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    cursor: pointer;
    &:hover{
        opacity: 0.2;
        transition: 300ms all ease-in-out ;
    }
`
const ImageDiv = styled.div`

`
const H1 = styled.strong`
    font-size: 25px;
    padding-top: 20px;
    padding-bottom: 6px;
    `
const Hr = styled.hr`
    width: 80%;
    border: none;
    border-top: 1px solid #999;
    padding-bottom: 20px;
`
const Img = styled.img`
    width: 100%;
    object-fit: contain;
`
const Form = styled.form`
    width: 100%;
    height: 50px;
    display: flex;
    background-color: transparent;
    align-items: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    input{
        width: 500px;
        height: 100%;
        border-radius: 30px;
        padding: 5px 25px;
        font-size: 16px;
    }
    button{
        color: #fff;
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
    }
`

export default SearchResult

