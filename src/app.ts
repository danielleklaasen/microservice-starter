import express = require('express');
import { NextFunction, Request, Response } from 'express';
import mongoose = require('mongoose');
import bluebird = require('bluebird');
import bodyParser = require('body-parser');
import { default as Kitten } from './models/Kitten';

const app = express(); // Create Express server

// MongoDB connection
(mongoose as any).Promise = bluebird;
const mongoUrl = 'mongodb://admin:T5He1tMkFj9Ti9Ng@cluster0-shard-00-00-2mxug.mongodb.net:27017,cluster0-shard-00-01-2mxug.mongodb.net:27017,cluster0-shard-00-02-2mxug.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
mongoose.connect(mongoUrl).then(
  () => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  },
).catch((err) => {
  console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
  // process.exit();
});

// Express configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Primary app routes
app.get('/', (req: Request, res: Response) => {
  res.send("hello world");
});
app.post('/kitten', (req: Request, res: Response) => { // create
  const kitty = new Kitten({ name: req.body.name });

  kitty.save((err, kitten) => {
    if (err) return res.send(err);
    res.send(kitten);
  });
});

app.get('/kitten/:id', (req: Request, res: Response) => { // read
  Kitten.findById(req.params.id, (err, kitten) => {
    res.send(kitten);
  });
});

app.get('/kittens', (req: Request, res: Response) => { // read all
  Kitten.find((err, kittens) => {
    res.send(kittens);
  });
});

// Clawdia

app.post('/kitten/:id', (req: Request, res: Response) => { // update
  Kitten.findByIdAndUpdate(req.params.id, { name: req.body.name }, (err, kitten) => {
    res.send(kitten);
  });
});

app.delete('/kitten/:id', (req: Request, res: Response) => { // delete
  Kitten.findByIdAndRemove(req.params.id, (err) => {
    if (!err) res.send('success');
  });
});



export default app;