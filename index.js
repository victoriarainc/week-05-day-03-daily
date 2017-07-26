const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();

app.engine ('mustache', mustacheExpress());
app.set ('views', './views');
app.set ('view engine', 'mustache');

app.use (express.static('public'));

const todos = [
  "Wash the car"
];

app.get("/", function (req, res) {
  res.render('bloop', {todos:todos});
});

app.post("/", function (req, res) {
  todos.push(req.body.todo);
  res.redirect('/');
});

app.listen(3000, function() {
  console.log('You started the application!');
});
