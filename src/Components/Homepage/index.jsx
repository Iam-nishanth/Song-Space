import React, { useEffect } from 'react'
import { useStateProvider } from '../../Context/StateProvider'
import axios from 'axios';
import styled from 'styled-components';
import { useHomeContext } from '../../Context/HomeContext';

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
                        <div><img src={image} /></div>
                        <h3>{name}</h3>
                    </Item>)}
            </Items>


        </Container>
    )
}
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    
    flex-direction: column;
    img{
        width: 100%;
        object-fit: contain;
   }
`
const Items = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap:30px;
    justify-content: center;
`
const Item = styled.div`
    width: 200px;
    height: auto;
    cursor: pointer;
    &:hover{
        opacity: 0.2;
    }
`
const Heading = styled.h1`
    font-size: 40px;
    color: #fff;
    padding: 20px 0;
`

export default Homepage