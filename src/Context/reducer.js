export const initialState = {
    token: null,
    userInfo: null,
    playlists: [],
    currentPlaying: null,
    playerState: false,
    selectedPlaylist: null,
    selectedPlaylistId: "37i9dQZF1DX0ieekvzt1Ic",
};

const reducer = (state, action) => {
    switch (action.type) {

        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token,
            };
        case 'SET_USER':
            return {
                ...state,
                userInfo: action.userInfo,
            };
        case 'SET_PLAYLISTS':
            return {
                ...state,
                playlists: action.playlists,
            };
        case 'SET_PLAYING':
            return {
                ...state,
                currentPlaying: action.currentPlaying,
            };
        case 'SET_PLAYER_STATE':
            return {
                ...state,
                playerState: action.playerState,
            };
        case 'SET_PLAYLIST':
            return {
                ...state,
                selectedPlaylist: action.selectedPlaylist,
            };
        case 'SET_PLAYLIST_ID':
            return {
                ...state,
                selectedPlaylistId: action.selectedPlaylistId,
            };
        default:
            return state;
    }
};

export default reducer