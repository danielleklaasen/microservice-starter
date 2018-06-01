import { Handler } from 'aws-lambda';
import * as bluebird from 'bluebird';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as serverless from 'serverless-http';
import { default as Kitten } from './models/Kitten';
import logger from './util/logger';
import { MONGODB_URI, SESSION_SECRET } from './util/secrets';

const app = express(); // Create Express server

// Express configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
bluebird.promisifyAll(mongoose as any); // use bluebird for promises
mongoose.connect(MONGODB_URI).then(() => {
  // Ready to use. The `mongoose.connect()` promise resolves to undefined.
})
.catch((error) => {
  // MongoDB connection error. Please make sure MongoDB is running.
  process.exit();
});

// Primary app routes
app.get('/', (req: express.request, res: express.response) => {
  res.send('hello world');
});
app.get('/health-check', (req, res) => res.sendStatus(200)); // 200 OK

app.post('/kitten', (req: express.request, res: express.response) => { // create
  const kitty = new Kitten({ name: req.body.name });

  kitty.saveAsync()
    .then((kitten) => {
      res.send(kitten);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get('/kittens', (req: express.request, res: express.response) => { // read
  Kitten.findAsync()
    .then((kittens) => {
      res.send(kittens);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.post('/kitten/:id', (req: express.request, res: express.response) => { // update
  Kitten.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    .then((kitten) => {
      res.send(kitten);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.delete('/kitten/:id', (req: express.request, res: express.response) => { // delete
  Kitten.findByIdAndRemove(req.params.id)
    .then(() => {
      res.send('success');
    })
    .catch((error) => {
      res.send(error);
    });
});

export const init: Handler = serverless(app);
module.exports = app;