import React from 'react'
import styled from 'styled-components'
import { BsFillPlayCircleFill, BsFillPauseCircleFill, BsShuffle } from 'react-icons/bs'
import { CgPlayTrackNext, CgPlayTrackPrev } from 'react-icons/cg'
import { FiRepeat } from 'react-icons/fi'
import { useStateProvider } from '../../Context/StateProvider'
import axios from 'axios'


const PlayerControls = () => {
    const [{ token, playerState, currentPlaying }, dispatch] = useStateProvider();

    const changeState = async () => {
        const state = playerState ? "pause" : "play";
        await axios.put(
            `https://api.spotify.com/v1/me/player/${state}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        );
        dispatch({
            type: 'SET_PLAYER_STATE',
            playerState: !playerState,
        });

    };

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
                artists: response.data.item.artists.map((artist) => artist.name),
                image: response.data.item.album.images[2].url,
            };
            dispatch({ type: 'SET_PLAYING', currentPlaying });
        } else {
            dispatch({ type: 'SET_PLAYING', currentPlaying: null });
        }
    };

    const changeTrack = async (type) => {
        await axios.post(
            `https://api.spotify.com/v1/me/player/${type}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        );
        dispatch({ type: 'SET_PLAYER_STATE', playerState: true });
        const res = await axios.get(
            "https://api.spotify.com/v1/me/player/currently-playing",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        );
        if (res.data !== "") {
            const currentPlaying = {
                id: res.data.item.id,
                name: res.data.item.name,
                artists: res.data.item.artists.map((artist) => artist.name),
                image: res.data.item.album.images[2].url,
            };
            dispatch({ type: 'SET_PLAYING', currentPlaying });

            getCurrentTrack();
        } else {
            dispatch({ type: 'SET_PLAYING', currentPlaying: null });
        }
    };




    return (
        <Container>
            <Shuffle>
                <BsShuffle />
            </Shuffle>
            <Prev>
                <CgPlayTrackPrev onClick={() => changeTrack('previous')} />
            </Prev>
            <PausePlay >
                {playerState
                    ? <BsFillPauseCircleFill onClick={changeState} />
                    : <BsFillPlayCircleFill onClick={changeState} />}
            </PausePlay>
            <Next>
                <CgPlayTrackNext onClick={() => changeTrack('next')} />
            </Next>
            <Repeat>
                <FiRepeat />
            </Repeat>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    svg{
        color: #999;
        transition: 0.3s ease-in-out;
        cursor: pointer;
        &:hover{
            color: #66ff66;
        }
    }
`
const Shuffle = styled.div` font-size:20px ;`
const Prev = styled.div` font-size:30px ;`
const PausePlay = styled.div` 
        svg{
            font-size:50px ;
            color: #66ff66;
            &:hover{
                color: #fff;
            }
        }
            
`
const Next = styled.div` font-size:30px ;`
const Repeat = styled.div` font-size:20px ;`

export default PlayerControls