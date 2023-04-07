import axios from 'axios';
import React, { useState } from 'react'
import { useStateProvider } from '../../Context/StateProvider';
import { Button, Container, Heading, Input } from '../../Styles/CreatePlaylistStyles';



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
            <Heading>Create a new Playlist</Heading>
            <Input type="text" placeholder="Playlist Name" value={playlistName} onChange={handlePlaylistNameChange} />
            <Input type="text" placeholder="Description" value={playlistDescription} onChange={handlePlaylistDescriptionChange} />
            <Button onClick={createPlaylist}>Create Playlist</Button>
        </Container>
    )
}



export default CreatePlaylist