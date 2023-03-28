import axios from 'axios'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useStateProvider } from '../../Context/StateProvider'

const CurrentSong = () => {

    const [{ token, currentPlaying }, dispatch] = useStateProvider();
    useEffect(() => {
        const getCurrentTrack = async () => {
            const response = await axios.get(
                "https://api.spotify.com/v1/me/player/currently-playing",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            );
            if (response.data !== "") {
                const currentPlaying = {
                    id: response.data.item.id,
                    name: response.data.item.name,
                    artists: response.data.item.artists.map((artist) => artist.name),
                    image: response.data.item.album.images[2].url,
                };
                dispatch({ type: 'SET_PLAYING', currentPlaying });
            } else {
                dispatch({ type: 'SET_PLAYING', currentPlaying: null });
            }
        };
        getCurrentTrack();
    }, [token, dispatch]);
    // console.log(currentPlaying)



    return (


        <Container>
            {currentPlaying && (
                <Track>
                    <TrackImage>
                        <img src={currentPlaying.image} alt='currentlyPlaying' />
                    </TrackImage>
                    <Info>
                        <h3>{currentPlaying.name}</h3>
                        <h4>{currentPlaying.artists.join(", ")}</h4>
                    </Info>
                </Track>
            )}
        </Container>


    )
}

const Container = styled.div`

`
const Track = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    padding-left: 20px;
`
const TrackImage = styled.div``
const Info = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    h3{
        color: #fff;
    }h4{
        color: #999;
    }
`
// const Track = styled.div``
export default CurrentSong