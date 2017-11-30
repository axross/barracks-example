const bodyParser = require('body-parser');
const express = require('express');
const build = require('./build');

const app = express()
  .use(bodyParser.text({ type: 'application/javascript' }))
  .post('/builds', (request, response) => {
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

app.listen(process.env.PORT || 5000);
