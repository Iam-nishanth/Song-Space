import axios from 'axios';
import React, { useState } from 'react'
import styled from 'styled-components'
import { useStateProvider } from '../../Context/StateProvider';



const CreatePlaylist = () => {
    const [{ token }, dispatch] = useStateProvider();

    const [playlistName, setPlaylistName] = useState('');
    const [playlistDescription, setPlaylistDescription] = useState('');

    const handlePlaylistNameChange = (event) => {
        setPlaylistName(event.target.value);
    }

    const handlePlaylistDescriptionChange = (event) => {
        setPlaylistDescription(event.target.value);
    }
    const userId = '31a3pgwsyevelhib25h7qqlhlssq'

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
                    name: playlistName,
                    description: playlistDescription,
                }
            });
            console.log('New playlist deleted: ', response);




        } catch (error) {
            console.error('Error creating playlist: ', error);
        }
        window.location.reload();
    };

    return (
        <Container>
            <h1>Create a new Playlist</h1>
            <input type="text" placeholder="Playlist Name" value={playlistName} onChange={handlePlaylistNameChange} />
            <input type="text" placeholder="Description" value={playlistDescription} onChange={handlePlaylistDescriptionChange} />
            <button onClick={createPlaylist}>Create Playlist</button>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 800px;
    width: 100%;
    /* justify-content: center; */
    align-items: center;
    height: 100vh;
    gap: 30px;
    h1{
        font-size: 60px;
    }
    input{
        height: 50px;
        border-radius: 30px;
        padding: 25px;
        width: 400px;
        font-size: 16px;
        font-weight: 600;
        font-family: inherit;
    }
    button{
        width: 200px;
        height: 50px;
        border-radius: 40px;
        background-color: #66ff66;
        font-family: inherit;
        font-size: 14px;
        font-weight: 600;
        transition: 300ms all ease-in-out;
        &:hover{
            background-color: #999;
        }
    }
    
`

export default CreatePlaylist