const bodyParser = require('body-parser');
const express = require('express');
const functions = require('firebase-functions');
const build = require('./src/build_rollup');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});

const app = express()
  .use(bodyParser.text({ type: 'application/javascript' }))
  .post('', (request, response) => {
    if (!request.is('application/javascript')) {
      return response.status(400).send('This API accepts only a request with body kind of "application/javascript".');
    }

    build(request.body)
      .then(result =>
        response
          .status(200)
          .type('application/javascript')
          .send(result),
      )
      .catch(err => {
        console.error(err);

        response.status(500).send(err.message);
      });
  });

exports.build = functions.https.onRequest(app);
