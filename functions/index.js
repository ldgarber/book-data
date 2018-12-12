const functions = require('firebase-functions');
const express = require('express'); 

const oauth = functions.config().oauth;
const webApp = express()

webApp.get( '/auth', (req, res) => {

  res.send( "my client id is: " + oauth.client_id  )
})

exports.oauth = functions.https.onRequest( webApp )
