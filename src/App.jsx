import React, { useEffect } from "react"
import Login from "./Components/Login"
import Player from "./Components/Player";
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
    <div className="App">

      {token ? <Player /> : <Login />}
    </div>
  )
}

export default App
