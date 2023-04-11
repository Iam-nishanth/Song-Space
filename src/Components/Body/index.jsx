import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useStateProvider } from '../../Context/StateProvider';
import { useSearchContext } from '../../Context/SearchContext';
import { useHomeContext } from '../../Context/HomeContext';
import { usePlaylistContext } from '../../Context/PlaylistContext';
import { useFavoritesContext } from '../../Context/FavouritesContext';
import Homepage from '../Homepage';
import CreatePlaylist from '../CreatePlaylist';
import Favourites from '../Favorites';
import { MdDelete, MdPlayCircle, } from 'react-icons/md';
import { Add, Album, Col1, Container, Delete, Details, DetailsHeading, DetailsPara, DetailsStrong, Duration, DurationPara, Fav, Img, ImgDiv, Info, InfoHeading, InfoPara, Modal, ModalButton, ModalOptions, ModalSelect, Playlist, SongList, SongRow } from '../../Styles/BodyStyles';
import styled from 'styled-components';

const Body = () => {

    const [{ token, selectedPlaylist, selectedPlaylistId, playlists }, dispatch] = useStateProvider();
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedID, setSelectedID] = useState(null);
    const [selectedSong, setSelectedSong] = useState(null);


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
            // console.log(response)
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
                    track_uri: track.uri
                })),
            };
            dispatch({ type: 'SET_PLAYLIST', selectedPlaylist });
        };
        getInitialPlaylist();
    }, [token, dispatch, selectedPlaylistId, selectedPlaylist]);
    // console.log(selectedPlaylist)


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

            console.log(`Playlist deleted successfully! : ${response}`);
        } catch (error) {
            console.error('Error deleting playlist: ', error);
        }
        // window.location.reload()
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


    const addToPlaylist = async (track_uri, track_number) => {
        console.log(`Adding song with ${track_uri} item to ${selectedID} playlist`);
        const response = await axios.post(
            `https://api.spotify.com/v1/playlists/${selectedID}/tracks`,
            {
                uris: [track_uri],
                position: 0,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        console.log(response);
    };

    const handleAddToPlaylist = async (track_uri, track_number) => {
        setModalOpen(false);
        if (selectedSong) {
            await addToPlaylist(selectedSong.track_uri, selectedSong.track_number, selectedID);
        }
        console.log(track_uri)
    };





    if (homeOpen) return <Homepage />
    if (CreateOpen) return <CreatePlaylist />
    if (favOpen) return <Favourites />
    else {
        return (
            <Container>

                <Playlist>
                    <ImgDiv>
                        <Img src={selectedPlaylist?.image} />
                    </ImgDiv>
                    <Details>
                        <DetailsStrong>PLAYLIST</DetailsStrong>
                        <DetailsHeading>{selectedPlaylist?.name}</DetailsHeading>
                        <DetailsPara>{selectedPlaylist?.description} </DetailsPara>
                        <Delete>
                            <MdPlayCircle title='Play the Playlist' onClick={() => playPlaylist(token, selectedPlaylist.uri)} />
                            <MdDelete title='Delete the Playlist' onClick={deletePlaylist} />
                        </Delete>


                    </Details>
                </Playlist>
                <SongList>
                    {selectedPlaylist?.tracks.map(({ id, name, artists, duration, image, album, context_uri, track_uri, track_number }) => {
                        return (
                            <SongRow key={id}>
                                <Col1 onClick={() =>
                                    playTrack(
                                        id,
                                        name,
                                        artists,
                                        image,
                                        context_uri,
                                        track_number
                                    )
                                }>
                                    <Album src={image} alt="" />
                                    <Info>
                                        <InfoHeading>{name}</InfoHeading>
                                        <InfoPara>{artists.join(', ')}</InfoPara>
                                    </Info>
                                </Col1>
                                <Duration>
                                    <Fav title='Add to Favourites' onClick={() => addToSavedTracks(token, id)} />
                                    <Add title='Add to Playlist' onClick={() => {
                                        setSelectedSong({
                                            track_uri: track_uri,
                                            track_number: track_number,
                                        });
                                        setModalOpen(!modalOpen);
                                    }} />
                                    <DurationPara>{msToMintues(duration)}</DurationPara>
                                </Duration>
                            </SongRow>
                        );
                    })}
                    {modalOpen && (
                        <Modal>
                            <ModalSelect
                                name='playlist'
                                id='playlist-select'
                                value={selectedID ? selectedID : ''}
                                onChange={(event) => setSelectedID(event.target.value)}
                            >
                                <ModalOptions>Select Playlist</ModalOptions>
                                {playlists.map(({ name, id }) => (
                                    <ModalOptions key={id} value={id ? id : ''}>
                                        {name}
                                    </ModalOptions>
                                ))}
                            </ModalSelect>
                            <ModalButton onClick={() => handleAddToPlaylist(selectedID)}>Add</ModalButton>
                        </Modal>
                    )}
                </SongList>
            </Container>
        )
    }
}






export default Body