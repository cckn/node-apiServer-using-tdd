var express = require('express');
var morgan = require('morgan');

var app = express();

var users = [
  { id: 1, name: 'elise' },
  { id: 2, name: 'dsad' },
  { id: 3, name: 'chris' },
];

app.use(morgan('dev'));

app.get('/users', function(req, res) {
  req.query.limit = req.query.limit || 10;
  req.query.offset = req.query.offset || 0;
  const limit = parseInt(req.query.limit, 10)? :10 ;
  const offset = parseInt(req.query.offset, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  if (Number.isNaN(offset)) {
    return res.status(400).end();
  }
  res.json(users.slice(offset, limit));
});

app.get('/users/:id', function(req, res) {
  const id = parseInt(req.params.id, 10);
  const user = users.filter(user => user.id === id)[0];
  res.json(user);
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});

module.exports = app;
