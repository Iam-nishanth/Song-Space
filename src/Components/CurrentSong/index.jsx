import axios from 'axios'
import React, { useEffect } from 'react'
import { useStateProvider } from '../../Context/StateProvider'
import { Container, Track, TrackImage, Img, Info, InfoH1, InfoPara } from '../../Styles/CurrentSongStyles'

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
                    artists: response.data.item?.artists.map((artist) => artist.name),
                    image: response.data.item.album.images[2].url,
                };
                dispatch({ type: 'SET_PLAYING', currentPlaying });
            } else {
                dispatch({ type: 'SET_PLAYING', currentPlaying: null });
            }
        };

        getCurrentTrack()
    }, [token, dispatch]);

    return (
        <Container>
            {currentPlaying && (
                <Track>
                    <TrackImage>
                        <Img src={currentPlaying.image} alt='currentlyPlaying' />
                    </TrackImage>
                    <Info>
                        <InfoH1>{currentPlaying.name}</InfoH1>
                        <InfoPara>{currentPlaying?.artists.join(', ')}</InfoPara>
                    </Info>
                </Track>
            )}
        </Container>
    )
}


export default CurrentSong