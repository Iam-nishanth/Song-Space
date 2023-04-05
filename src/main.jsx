import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import reducer, { initialState } from './Context/reducer'
import { StateProvider } from './Context/StateProvider'
import { SearchProvider } from './Context/SearchContext'
import { HomeProvider } from './Context/HomeContext'
import { PlaylistProvider } from './Context/PlaylistContext'
import { FavouriteProvider } from './Context/FavouritesContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HomeProvider>
      <PlaylistProvider>
        <SearchProvider >
          <FavouriteProvider>
            <StateProvider initialState={initialState} reducer={reducer}>
              <App />
            </StateProvider>
          </FavouriteProvider>
        </SearchProvider>
      </PlaylistProvider>
    </HomeProvider>

  </React.StrictMode>
)
