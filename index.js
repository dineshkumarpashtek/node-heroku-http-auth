const express = require('express');
const auth = require('http-auth');

require('dotenv').config();

const basic = auth.basic({
        realm: "Private Area"
    }, (username, password, callback) => {
        callback(username === process.env.USER_NAME && password === process.env.USER_PASSW);
    }
);

basic.on('fail', (result, req) => {
  console.log(`User authentication failed: ${result.user}`);
});

basic.on('error', (error, req) => {
  console.log(`Authentication error: ${error.code + " - " + error.message}`);
});

const PORT = process.env.PORT || 5000;
 
express()
  .use(auth.connect(basic))
  .get('/', (req, res) => res.send(`Hello from express - ${req.user}!`))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));