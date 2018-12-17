const functions = require('firebase-functions');
const express = require('express');
const simpleOauth = require('simple-oauth2');
const randomstring = require('randomstring');

const oauth = functions.config().oauth;
const webApp = express();

const oauth2 = simpleOauth.create({
  client: {
    id: oauth.client_id,
    secret: oauth.client_secret, 
    idParamName: "key", 
  },
  auth: {
    tokenHost: 'https://www.goodreads.com/',
    tokenPath: oauth.token_path || '/oauth/request_token',
    authorizePath: oauth.authorize_path || '/oauth/authorize', 
  }
})

webApp.get('/auth', (req, res) => {
  const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: oauth.redirect_uri,
  })

  res.redirect(authorizationUri)
})

webApp.get('/callback', (req, res) => {
  console.log( req.query ); 

  var options = {
    code: req.query.code, 
    scope: oauth.scopes || 'public', 
    redirect_uri: oauth.redirect_uri
  } 

  return oauth2.authorizationCode.getToken(options).then((result) => {
    const token = oauth2.accessToken.create(result)

    res.setHeader('Content-Type', 'application/json'); 
    return res.send(JSON.stringify({ token: token.token.access_token })); 
  }).catch((error) => {
    console.error('Access Token Error', error.message)
    res.send( error )
  })
}) 

exports.oauth = functions.https.onRequest( webApp )
