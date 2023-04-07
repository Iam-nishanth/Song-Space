import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useStateProvider } from '../../Context/StateProvider';
import { MdDelete, MdFavorite } from 'react-icons/md'
import { Album, Col1, Container, Delete, Details, DetailsHeading, Info, InfoH1, InfoPara, SongRow, Songs } from '../../Styles/FavouriteStyles';
import { json } from 'react-router';


const Favourites = () => {
    const [{ token, favourites }, dispatch] = useStateProvider();
    const [deleteMethod, setDeleteMethod] = useState('');


    useEffect(() => {
        const getFavouritesData = async () => {
            const response = await axios.get(
                "https://api.spotify.com/v1/me/tracks",
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            );
            const { items } = response.data;
            const data = items.map(item => ({
                name: item.track.name,
                id: item.track.id,
                image: item.track.album.images[0].url,
                context_uri: item.track.album.uri,
                artists: item.track.artists.map(artist => artist.name),
                track_number: item.track.track_number,

            }));


            dispatch({ type: 'SET_FAVOURITES', favourites: data });
            // console.log(data)
        };
        getFavouritesData();
    }, [token, deleteMethod]);

    const playTrack = async (
        id,
        name,
        artists,
        image,
        context_uri,
        track_number,
    ) => {
        const response = await axios.put(
            `https://api.spotify.com/v1/me/player/play?Active`,
            {
                context_uri,
                offset: {
                    position: track_number - 1,
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

    const removeSavedTrack = async (id) => {
        try {
            const response = await axios.delete(`https://api.spotify.com/v1/me/tracks?ids=${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // console.log(`Track ${id} removed from saved tracks.`);
            console.log(JSON.stringify(response))
            // console.log(response.config.method)
            setDeleteMethod(response.config.method)

            // dispatch({ type: 'SET_FAVOURITES', favourites: data });

        } catch (error) {
            console.log(`Error removing track ${id}: ${error.message}`);
        }
    };




    return (
        <Container>
            <Details>
                <DetailsHeading><MdFavorite /> Favourite Songs <MdFavorite /></DetailsHeading>
            </Details>

            <Songs>

                {favourites !== undefined &&
                    favourites.map(({ name, id, image, context_uri, artists, track_number }) => {
                        return (
                            <SongRow key={id}

                            >
                                <Col1 onClick={() =>
                                    playTrack(
                                        id,
                                        name,
                                        artists,
                                        image,
                                        context_uri,
                                        track_number,
                                    )
                                }>
                                    <Album src={image} alt="" />
                                    <Info>
                                        <InfoH1>{name}</InfoH1>
                                        <InfoPara>{artists.join(', ')}</InfoPara>
                                    </Info>
                                </Col1>
                                <Delete title='Remove from Favourites' onClick={() => removeSavedTrack(id)} />
                            </SongRow>
                        );
                    })}
            </Songs>
        </Container>

    );
};


export default Favourites;
