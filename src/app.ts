import express = require('express');
const app = express(); // Create Express server
const cors = require('cors')

app.use(cors())

// Primary app routes
app.get('/', (req, res) => {
  res.send("hello world");
});

export default app;