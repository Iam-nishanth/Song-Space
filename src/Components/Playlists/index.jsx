import axios from 'axios'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useHomeContext } from '../../Context/HomeContext'
import { usePlaylistContext } from '../../Context/PlaylistContext'
import { useFavoritesContext } from '../../Context/FavouritesContext'
import { useStateProvider } from '../../Context/StateProvider'

const Playlists = () => {

    const [{ token, playlists }, dispatch] = useStateProvider();
    // const { setHomeOpen, homeOpen } = useHomeContext()
    // const { setCreateOpen, CreateOpen } = usePlaylistContext()
    // const { setFavOpen, favOpen } = useFavoritesContext()

    useEffect(() => {
        const getPlaylistData = async () => {
            const response = await axios.get(
                "https://api.spotify.com/v1/me/playlists",
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            );
            const { items } = response.data;
            const playlists = items.map(({ name, id }) => {
                return { name, id };
            });
            dispatch({ type: 'SET_PLAYLISTS', playlists });
        };
        getPlaylistData();
    }, [token, dispatch]);
    const changeCurrentPlaylist = (selectedPlaylistId) => {
        dispatch({ type: 'SET_PLAYLIST_ID', selectedPlaylistId });
        console.log(selectedPlaylistId)
    };


    return (
        <Container>
            <Wrapper>
                {playlists.map(({ name, id }) =>
                    <Para
                        key={id} onClick={() => changeCurrentPlaylist(id)}
                    >{name}</Para>
                )}

            </Wrapper>
        </Container >
    )
}
const Container = styled.div`
    color: #ccc;
    height: 100%;   
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 15px;
    height: 50vh;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar{
        width: 10px;
        &-thumb{
            background-color: #cccccc25;
        }
    }
`
const Para = styled.p`
    font-size: 14px;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    &:hover{
        color: #999;
    }
`
export default Playlists