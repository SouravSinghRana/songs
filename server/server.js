const express = require("express");
const cors = require("cors");
const SpotifyWebApi = require("spotify-web-api-node");

const app = express();
app.use(cors());
app.use(express.json());


app.post('/refresh', (req , res) => {
  const refreshToken = req.body.refreshToken;
  console.log('hey')
  const spotifyApi = new SpotifyWebApi({
  redirectUri: "http://localhost:3000",
  clientId: "dd806f49b30047f59763530b72d45cc5",
  clientSecret: "28cb7367cd284d90a381d9a0d426d251",
  refreshToken
  })

  spotifyApi.refreshAccessToken()
  .then((data) => {
    console.log('The access token has been refreshed!', data.body);
    res.json({
      accessToken : data.body.accessToken,
      expiresIn : data.body.expiresIn
    })
  
  }).catch((err) => {
      console.log("server err", err);
      res.sendStatus(400)
  })

})

app.post("/login", (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "dd806f49b30047f59763530b72d45cc5",
    clientSecret: "28cb7367cd284d90a381d9a0d426d251",
  })

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(err => {
      console.log("server err", err);
      res.sendStatus(400)
    })
})

app.listen(3001)