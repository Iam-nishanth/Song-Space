import axios from 'axios';
import React, { useEffect } from 'react'
import styled from 'styled-components';
import { useStateProvider } from '../../Context/StateProvider';
import { useSearchContext } from '../../Context/SearchContext';
import { useHomeContext } from '../../Context/HomeContext';
import { usePlaylistContext } from '../../Context/PlaylistContext';
import Homepage from '../Homepage';
import CreatePlaylist from '../CreatePlaylist';
import { useFavoritesContext } from '../../Context/FavouritesContext';
import Favourites from '../Favorites';
import { MdDelete, MdFavorite, MdPlayCircle, } from 'react-icons/md';

const Body = () => {

    const [{ token, selectedPlaylist, selectedPlaylistId }, dispatch] =
        useStateProvider();

    const { searchOpen } = useSearchContext();
    const { homeOpen } = useHomeContext()
    const { CreateOpen } = usePlaylistContext()
    const { favOpen } = useFavoritesContext()

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
                image: response.data.images[0] ? response.data.images[0].url : '',
                tracks: response.data.tracks.items.map(({ track }) => ({
                    id: track.id,
                    name: track.name,
                    artists: track.artists.map((artist) => artist.name),
                    image: track.album.images[0] ? track.album.images[0].url : '',
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

    const playPlaylist = async (token, uri) => {

        const response = await axios({
            method: 'put',
            url: 'https://api.spotify.com/v1/me/player/play',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: {
                context_uri: uri,
            }
        });

        console.log('Playlist is now playing: ', response);
        if (response.status === 204) {
            const currentPlaying = {

            };
            dispatch({ type: 'SET_PLAYING', currentPlaying });
            dispatch({ type: 'SET_PLAYER_STATE', playerState: true });
        } else {
            dispatch({ type: 'SET_PLAYER_STATE', playerState: null });
        }

    };

    const deletePlaylist = async () => {
        try {
            const response = await axios({
                method: 'delete',
                url: `https://api.spotify.com/v1/playlists/${selectedPlaylistId}/followers`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Playlist deleted successfully! :' + response);
        } catch (error) {
            console.error('Error deleting playlist: ', error);
        }
        window.location.reload()
    };
    const addToSavedTracks = async (token, trackId) => {
        try {
            const response = await axios({
                method: 'put',
                url: `https://api.spotify.com/v1/me/tracks?ids=${trackId}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            console.log('Track added to saved tracks: ', response);
        } catch (error) {
            if (error.response.status === 403) {
                console.error('User does not have permission to add tracks to saved tracks.');
            } else {
                console.error('Error adding track to saved tracks: ', error);
            }
        }
    };

    const msToMintues = (ms) => {
        var minutes = Math.floor(ms / 60000);
        var seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    };


    if (homeOpen) return <Homepage />
    if (CreateOpen) return <CreatePlaylist />
    if (favOpen) return <Favourites />
    else {
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
                        <Delete>
                            <MdPlayCircle onClick={() => playPlaylist(token, selectedPlaylist.uri)} />
                            <MdDelete onClick={deletePlaylist} />
                        </Delete>
                        {/* <Delete>delete</Delete> */}


                    </Details>
                </Playlist>
                <SongList>
                    {
                        selectedPlaylist?.tracks.map(({ id, name, artists, duration, image, album, context_uri, track_number }) => {
                            return <SongRow key={id}
                            >
                                <Col1>

                                    <Album src={image} alt="" onClick={() =>
                                        playTrack(
                                            id,
                                            name,
                                            artists,
                                            image,
                                            context_uri,
                                            track_number
                                        )
                                    } />
                                    <Info>
                                        <h1>{name}</h1>
                                        <p>{artists.join(', ')}</p>
                                    </Info>
                                </Col1>
                                <Duration>
                                    <Fav onClick={() => addToSavedTracks(token, id)} />
                                    <p>{msToMintues(duration)}</p>
                                </Duration>
                            </SongRow>
                        })
                    }
                </SongList>
            </Container>
        )
    }
}

const Container = styled.section`
    width: 100%;
    height: 100%;
    overflow-x: hidden;
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
        width: 200px;
        height: 200px;
        object-fit: contain;
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
    align-items: center;
    
    `
const Album = styled.img`
    height: 45px;
  width: 45px;
`
const Fav = styled(MdFavorite)`
        font-size: 25px;
        opacity: 0;
        &:hover{
            ${Info}{
                opacity: 0.;
            }
            color: #66ff66;
        }
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
    ${Fav}{
        opacity: 1;
    }
}
`
const Duration = styled.div`
    display: flex;
    align-self: flex-end;
    margin-right: 40px;
    justify-content: space-between;
    width: 100px;
    align-items: center;
    `
const Delete = styled.div`
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




export default Body