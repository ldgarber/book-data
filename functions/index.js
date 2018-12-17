const functions = require('firebase-functions');
const express = require('express');
const goodreads = require('goodreads-api-node'); 
const oauth = functions.config().oauth;
const webApp = express();

//new goodreads stuff
const creds = {
  key: oauth.client_id, 
  secret: oauth.client_secret
} 

const gr = goodreads(creds); 
gr.initOAuth(oauth.redirect_uri); 

webApp.get('/auth', (req, res) => {
  gr.getRequestToken()
    .then(url => {
      console.log("redirecting"); 
      res.redirect(url); 
    });  
})

webApp.get('/callback', (req, res) => {
  console.log( req.query ); 

  gr.getAccessToken()
    .then(() => {
      console.log('success!')
      
    }); 
  res.redirect( oauth.static_site_url + "?auth=true" ); 
}) 

exports.oauth = functions.https.onRequest( webApp )
