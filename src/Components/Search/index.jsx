import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { MdSearch } from 'react-icons/md'
import styled from 'styled-components'
import { useStateProvider } from '../../Context/StateProvider';
import { Container, Form, FormButton, FormInput, H1, Hr, ImageDiv, Img, Item, ItemDetails, ItemH1, ItemPara, Items } from '../../Styles/SearchStyles';

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
                <FormInput type="text" onChange={handleInputChange} ref={searchKeyRef} />
                <FormButton type="submit"><MdSearch /></FormButton>
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
                        <ItemH1>{name}</ItemH1>
                        <ItemPara>{artists.join(', ')}</ItemPara>

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
                        <ItemH1>{name}</ItemH1>
                        <ItemPara>{artists.join(', ')}</ItemPara>

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
                        <ItemDetails>
                            <ItemH1>{name}</ItemH1>
                            <ItemPara>{artists.join(', ')}</ItemPara>
                        </ItemDetails>


                    </Item>)}
            </Items>
        </Container>
    );



}


export default SearchResult

