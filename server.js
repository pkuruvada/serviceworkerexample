const express = require('express');
const path = require('path');
const fs = require('fs');

// Express
const app = express();

// serve the service worker file
app.get('/serviceworker.js',  (req, res) => {
  res.setHeader('Content-Type', 'text/javascript');
  res.sendFile(path.join(__dirname, 'serviceworker.js'));
});

// serve other static files
app.use(express.static(path.join(__dirname, 'public')));
app.listen(8000);
