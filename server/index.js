import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();


const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;

// Step 3: Create an Express server
const app = express();
app.use(cors());
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Step 1: Redirect to Spotify's authorization endpoint
app.get('/login', (req, res) => {
    const scopes = 'user-read-private user-read-email'; // replace with your scopes
    res.redirect('https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + spotify-client-id +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(redirect_uri));
});

// Step 2: Receive the authorization code
app.get('/callback', (req, res) => {
    const code = req.query.code || null;

    // Step 3: Exchange the authorization code for an access token
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer(spotify-client-id + ':' + spotify-client-secret).toString('base64'))
        },
        json: true
    };

    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token;
            // use the access token to access the Spotify Web API
        }
    });
});

