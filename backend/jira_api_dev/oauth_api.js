const fs=require('fs');
let privateKeyData = fs.readFileSync(__dirname + '/rsa.pem','utf-8');

const oauth = {
    consumer_key: 'oauth-sample-consumer', //Your consumer key
    consumer_secret: privateKeyData, //This will contain the private key.
    token: '8lXcHngxHEGhhEv0lJ8LXiA6EKvqXsWD', //Enter your OAuth access token here
    token_secret: '27PBmF0pDO6pCDcgEUfFgym10DBXaDwt',//Enter your OAuth token secret here
    signature_method : 'RSA-SHA1'};

module.exports = oauth;