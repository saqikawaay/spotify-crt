import { error } from 'console';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';

import QueryString from 'qs';

const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = 'http://localhost:3000/auth/callback';
const stateKey = 'spotify_auth_state';

const app = express();
app.use(cors());
const port = 3000;

//code to generate a random number to prevent a CSRF attack. consider it a state. Recommended by spotify docs. 

const generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  
// Step 1: Redirect to Spotify's authorization endpoint
app.get('/login', (req, res) => {


    console.log("client id" + spotifyClientId)
    const scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
        QueryString.stringify({
            response_type: 'code',
            client_id: spotifyClientId,
            scope: scope,
            redirect_uri: redirectUri,
        }));
}
);




// Step 2: Receive the authorization code
app.get('/auth/callback', (req, res) => {
    const code = req.query.code || null;
    if (code) {
        console.log("code" + code)
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code',
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(spotifyClientId + ':' + spotifyClientSecret).toString('base64')),
            },
            json: true,
        };
        app.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                access_token = body.access_token,
                    refresh_token = body.refresh_token;
                res.redirect('/auth/token');
            } else {
                res.redirect('/#' +
                    QueryString.stringify({
                        error: 'invalid_token',
                    }));
            }
        });

    }
    
  




});


// Step 3: Get the auth/token endpoiknt to get the access token in JSON format

app.get('/auth/token', (req, res) => {
    res.json({ access_token: access_token });
    console.log("access token succesful, it's: " + access_token)
}
);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
