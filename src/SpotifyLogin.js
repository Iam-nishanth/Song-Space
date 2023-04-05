export const LoginFunction = () => {
    const ClientId = '4080f5c8eeda400490c1f001fb3dd8c2'
    const RedirectUrl = 'http://127.0.0.1:5173/'
    const AuthUrl = 'https://accounts.spotify.com/authorize'
    const AuthScopes = [
        'user-read-private',
        'user-read-email',
        'user-modify-playback-state',
        'user-read-playback-state',
        'user-read-currently-playing',
        'user-read-recently-played',
        'user-read-playback-position',
        'user-top-read',
        'playlist-modify-public',
        'playlist-modify-private',
        'user-library-read',
        'user-library-modify',
    ]
    window.location.href = `${AuthUrl}?client_id=${ClientId}&redirect_uri=${RedirectUrl}&scope=${AuthScopes.join(" ")}&response_type=token&show_dialog=true`
}