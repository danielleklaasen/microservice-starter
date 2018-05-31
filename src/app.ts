import * as bluebird from 'bluebird';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
//const mongoose = require('mongoose');

import { default as Kitten } from './models/Kitten';

const app = express(); // Create Express server

// MongoDB setup
bluebird.promisifyAll(mongoose as any); // use bluebird for promises
const mongoUrl = 'mongodb://admin:T5He1tMkFj9Ti9Ng@cluster0-shard-00-00-2mxug.mongodb.net:27017,cluster0-shard-00-01-2mxug.mongodb.net:27017,cluster0-shard-00-02-2mxug.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
// MongoDB connection
mongoose.connect(mongoUrl).then(
  () => {
    // Ready to use. The `mongoose.connect()` promise resolves to undefined.
  },
).catch((error) => {
  // MongoDB connection error. Please make sure MongoDB is running.
  process.exit();
});

// Express configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Primary app routes
app.get('/', (req: express.request, res: express.response) => {
  res.send('hello world');
});

app.post('/kitten', (req: express.request, res: express.response) => { // create
  const kitty = new Kitten({ name: req.body.name });

  kitty.saveAsync()
    .then((kitten) => {
    res.send(kitten);
    })
    .catch((error)=>{
      res.send(error);
    });
});

app.get('/kittens', (req: express.request, res: express.response) => { // read
  Kitten.findAsync()
    .then((kittens) => {
      res.send(kittens);
    })
    .catch((error)=>{
      res.send(error);
    });
});

app.post('/kitten/:id', (req: express.request, res: express.response) => { // update
  Kitten.findByIdAndUpdate(req.params.id, { name: req.body.name }, {new: true})
    .then((kitten)=>{
      res.send(kitten);
    })
    .catch((error)=>{
    res.send(error);
  });
});

app.delete('/kitten/:id', (req: express.request, res: express.response) => { // delete
  Kitten.findByIdAndRemove(req.params.id)
    .then(() => {
      res.send('success');
    })
    .catch((error)=>{
      res.send(error);
    });
});

export default app;
