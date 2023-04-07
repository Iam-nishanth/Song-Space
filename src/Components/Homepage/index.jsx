import React, { useEffect } from 'react'
import { useStateProvider } from '../../Context/StateProvider'
import axios from 'axios';
import styled from 'styled-components';
import { useHomeContext } from '../../Context/HomeContext';
import { Container, Heading, Img, Item, ItemH3, ItemImage, Items } from '../../Styles/HomeStyles';

const Homepage = () => {

    const { setHomeOpen } = useHomeContext();

    const [{ token, HomeContent, playlists }, dispatch] = useStateProvider();
    useEffect(() => {
        const getFeaturedData = async () => {
            const response = await axios.get(
                "https://api.spotify.com/v1/browse/featured-playlists",
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                    limit: 40,
                }
            );
            const items = response.data.playlists.items

            const HomeContent = items.map((item) => {
                return {
                    name: item.name,
                    id: item.id,
                    image: item.images[0].url,
                    // artists: artists

                }
            })

            // console.log(items)
            dispatch({ type: 'SET_HOME_CONTENT', HomeContent });
        };
        getFeaturedData();
    }, [token, dispatch]);
    const changeCurrentPlaylist = (selectedPlaylistId) => {
        setHomeOpen(prev => !prev)
        dispatch({ type: 'SET_PLAYLIST_ID', selectedPlaylistId });
        // console.log(first)
    };
    // console.log((HomeContent !== undefined) && HomeContent.map(({ name, id }) => name));


    return (
        <Container className='container'>
            <Heading>Featured Playlists</Heading>
            <Items>

                {(HomeContent !== undefined) && HomeContent.map(({ name, id, image }) =>
                    <Item key={id} onClick={() => changeCurrentPlaylist(id)}>
                        <ItemImage><Img src={image} /></ItemImage>
                        <ItemH3>{name}</ItemH3>
                    </Item>)}
            </Items>


        </Container>
    )
}


export default Homepage