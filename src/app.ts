import * as bluebird from 'bluebird';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import { default as Kitten } from './models/Kitten';

const app = express(); // Create Express server

// MongoDB connection
(mongoose as any).Promise = bluebird;
const mongoUrl = 'mongodb://admin:T5He1tMkFj9Ti9Ng@cluster0-shard-00-00-2mxug.mongodb.net:27017,cluster0-shard-00-01-2mxug.mongodb.net:27017,cluster0-shard-00-02-2mxug.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
mongoose.connect(mongoUrl).then(
  () => {
    // Ready to use. The `mongoose.connect()` promise resolves to undefined.
  },
).catch((err) => {
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

  kitty.save((err, kitten) => {
    if (err) return res.send(err);
    res.send(kitten);
  });
});

app.get('/kitten/:id', (req: express.request, res: express.response) => { // read
  Kitten.findById(req.params.id, (err, kitten) => {
    res.send(kitten);
  });
});

app.get('/kittens', (req: express.request, res: express.response) => { // read all
  Kitten.find((err, kittens) => {
    res.send(kittens);
  });
});

app.post('/kitten/:id', (req: express.request, res: express.response) => { // update
  Kitten.findByIdAndUpdate(req.params.id, { name: req.body.name }, (err, kitten) => {
    res.send(kitten);
  });
});

app.delete('/kitten/:id', (req: express.request, res: express.response) => { // delete
  Kitten.findByIdAndRemove(req.params.id, (err) => {
    if (!err) res.send('success');
  });
});

export default app;
