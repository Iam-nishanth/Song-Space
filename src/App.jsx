import React, { useEffect } from "react"
import styled from "styled-components";
import Login from "./Components/Login"
import Player from "./Components/Player";
import SearchResult from "./Components/Search";
import { useStateProvider } from "./Context/StateProvider";

function App() {

  const [{ token }, dispatch] = useStateProvider();

  useEffect(() => {
    const Hash = window.location.hash
    if (Hash) {
      const token = Hash.substring(1).split('&')[0].split('=')[1]
      dispatch({
        type: 'SET_TOKEN',
        token,
      })
    }

  }, [token, dispatch])

  return (

    <Container className="App">
      {token ? <Player /> : <Login />}
    </Container>
  )
}

const Container = styled.main`
  /* display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh; */
  
  
`

export default App
