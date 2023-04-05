import axios from 'axios';
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useStateProvider } from '../../Context/StateProvider';
import { MdDelete, MdFavorite } from 'react-icons/md'


const Favourites = () => {
    const [{ token, favourites }, dispatch] = useStateProvider();

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
    }, [token]);

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
            console.log(`Track ${id} removed from saved tracks.`);
            dispatch({ type: 'SET_FAVOURITES', favourites: data });
        } catch (error) {
            console.log(`Error removing track ${id}: ${error.message}`);
        }
    };



    return (
        <Container>
            <Details>
                <h1><MdFavorite /> Favorite Songs <MdFavorite /></h1>
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
                                        <h1>{name}</h1>
                                        <p>{artists.join(', ')}</p>
                                    </Info>
                                </Col1>
                                <Delete onClick={() => removeSavedTrack(id)} />
                            </SongRow>
                        );
                    })}
            </Songs>
        </Container>

    );
};
const Container = styled.div`
    display: flex;
    justify-content: center;
    /* align-items: center; */
    flex-direction: column;
    overflow-x: hidden;
`
const Details = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 200px;
    /* justify-content: center; */
    h1{
        font-size: 60px;
        padding-left: 20px;
        display: flex;
        align-items: center;
        color: #66ff66;
        text-decoration: underline;
    }
`
const Songs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`
const Col1 = styled.div`
    display: flex;
`
const Album = styled.img`
    height: 50px;
    width: 50px;
    object-fit: contain;
`
const Delete = styled(MdDelete)`
    opacity: 0;
    font-size: 25px;
    &:hover{
        color: red;
    }

`
const SongRow = styled.div`
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
const Info = styled.div`
padding-left: 15px;
 h1 {
  font-size: 16px;
}p {
  font-size: 14px;
  margin-top: 3px;
  color: gray;
}`

export default Favourites;
