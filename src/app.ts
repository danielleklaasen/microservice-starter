import express = require('express');
import { NextFunction, Request, Response } from 'express';
import mongoose = require('mongoose');
import bluebird = require('bluebird');

const app = express(); // Create Express server

// MongoDB connection
(mongoose as any).Promise = bluebird;
const mongoUrl = 'mongodb://admin:T5He1tMkFj9Ti9Ng@cluster0-shard-00-00-2mxug.mongodb.net:27017,cluster0-shard-00-01-2mxug.mongodb.net:27017,cluster0-shard-00-02-2mxug.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
mongoose.connect(mongoUrl).then(
  () => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  },
).catch(() => {
  console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
  // process.exit();
});

// Primary app routes
app.get('/', (req: Request, res: Response) => {
  res.send("hello world");
});



export default app;