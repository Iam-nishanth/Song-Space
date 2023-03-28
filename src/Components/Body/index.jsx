import axios from 'axios';
import React, { useEffect } from 'react'
import styled from 'styled-components';
import { useStateProvider } from '../../Context/StateProvider';

const Body = () => {

    const [{ token, selectedPlaylist, selectedPlaylistId }, dispatch] =
        useStateProvider();

    useEffect(() => {
        const getInitialPlaylist = async () => {
            const response = await axios.get(
                `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            );
            const selectedPlaylist = {
                id: response.data.id,
                name: response.data.name,
                uri: response.data.uri,
                description: response.data.description.startsWith("<a")
                    ? ""
                    : response.data.description,
                image: response.data.images[0].url,
                tracks: response.data.tracks.items.map(({ track }) => ({
                    id: track.id,
                    name: track.name,
                    artists: track.artists.map((artist) => artist.name),
                    image: track.album.images[2].url,
                    duration: track.duration_ms,
                    album: track.album.name,
                    context_uri: track.album.uri,
                    track_number: track.track_number,
                })),
            };
            dispatch({ type: 'SET_PLAYLIST', selectedPlaylist });
        };
        getInitialPlaylist();
    }, [token, dispatch, selectedPlaylistId]);

    const playTrack = async (
        id,
        name,
        artists,
        image,
        context_uri,
        track_number
    ) => {
        const response = await axios.put(
            `https://api.spotify.com/v1/me/player/play`,
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
    const playPlaylist = async (
        id,
        uri,



    ) => {
        const response = await axios.put(
            `https://api.spotify.com/v1/me/player/play`,
            {
                uri,
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

            };
            dispatch({ type: 'SET_PLAYING', currentPlaying });
            dispatch({ type: 'SET_PLAYER_STATE', playerState: true });
        } else {
            dispatch({ type: 'SET_PLAYER_STATE', playerState: true });
        }
    };

    const msToMintues = (ms) => {
        var minutes = Math.floor(ms / 60000);
        var seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    };


    return (
        <Container>
            <Playlist>
                <ImgDiv>
                    <img src={selectedPlaylist?.image} />
                </ImgDiv>
                <Details>
                    <strong>PLAYLIST</strong>
                    <h1>{selectedPlaylist?.name}</h1>
                    <p>{selectedPlaylist?.description} </p>
                </Details>
            </Playlist>
            <SongList>
                {
                    selectedPlaylist?.tracks.map(({ id, name, artists, duration, image, album, context_uri, track_number }) => {
                        return <SongRow key={id}
                            onClick={() =>
                                playTrack(
                                    id,
                                    name,
                                    artists,
                                    image,
                                    context_uri,
                                    track_number
                                )
                            }>
                            <Col1>
                                <Album src={image} alt="" />
                                <Info>
                                    <h1>{name}</h1>
                                    <p>{artists}</p>
                                </Info>
                            </Col1>
                            <Duration><p>{msToMintues(duration)}</p></Duration>
                        </SongRow>
                    })
                }
            </SongList>


        </Container>
    )
}

const Container = styled.section`
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    /* padding: 10px; */
    
`
const Playlist = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 200px;
    padding: 20px;
    gap: 20px;
`
const SongList = styled.div``
const ImgDiv = styled.div`
    img{
        width: 180px;
        height: auto;
    }
`
const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
    justify-content: flex-end;
    color: #fff;
    h1{
        font-size: 40px;
    }
    p{
        font-size: 16px;
    }
`
const Info = styled.div`
margin-left: 15px;
 h1 {
  font-size: 16px;
}p {
  font-size: 14px;
  margin-top: 3px;
  color: gray;
}`
const Col1 = styled.div`
    display: flex;
`
const Album = styled.img`
    height: 45px;
  width: 45px;
`
const SongRow = styled.div`
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
    }
`
const Duration = styled.div`
    display: flex;
    align-self: flex-end;
    margin-right: 40px;
`



export default Body