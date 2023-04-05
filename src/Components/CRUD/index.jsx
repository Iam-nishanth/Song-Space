import React from 'react'
import axios from 'axios'
import { useStateProvider } from '../../Context/StateProvider';
import styled from 'styled-components';

const CRUD = () => {

    const [{ token, userInfo }, dispatch] = useStateProvider()

    // console.log(userInfo.userId)

    const userId = '31a3pgwsyevelhib25h7qqlhlssq'
    const playlistId = '7HtbRGZrNB9HlmZcB0TzcU'

    // Function to create a new playlist
    const createPlaylist = async () => {
        try {
            const response = await axios({
                method: 'post',
                url: `https://api.spotify.com/v1/users/${userId}/playlists`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    name: "New Playlist"
                }
            });
            console.log('New playlist created: ', response);

        } catch (error) {
            console.error('Error creating playlist: ', error);
        }
    };

    // Function to delete a playlist
    const deletePlaylist = async () => {
        try {
            const response = await axios({
                method: 'delete',
                url: `https://api.spotify.com/v1/playlists/${playlistId}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Playlist deleted: ', response);
        } catch (error) {
            console.error('Error deleting playlist: ', error);
        }
    };

    // Call the functions as needed
    // createPlaylist(); // call this function when you want to create a new playlist
    // deletePlaylist(); // call this function when you want to delete a playlist


    return (
        <Container>
            <button onClick={createPlaylist}>create</button>
            <button onClick={deletePlaylist}>delete</button>
        </Container>
    )
}
const Container = styled.div`
    display: flex;
    gap: 30px;
    justify-content: center;
    button{
        width:200px;
        height: 50px;
        
    }
`
export default CRUD