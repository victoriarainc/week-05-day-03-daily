// ===========PACKAGES===========

const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const bodyParser = require('body-parser')

// =========BOILER PLATE===========

app.engine ('mustache', mustacheExpress());
app.set ('views', './views');
app.set ('view engine', 'mustache');

app.use (bodyParser());

// =============ARRAYS===============

const todoArray = [
  { id: 1, text: 'Groceries' },
  { id: 2, text: 'Dishes'}
];
const doneArray = [
  { id: 3, text: 'Completed'}
];

last_id = 3;

// ============HOME PAGE===========

app.get("/", function (req, res) {
  res.render('bloop',
  {todos:todoArray, done: doneArray}
  );
});
app.post("/", function (req, res) {
  last_id += 1;
  todoArray.push({id: last_id, text: req.body.item });

  res.redirect('/');
});

// =============SUBMIT PAGE===========

app.post("/:id", function(req, res) {
  let id = req.params.id;
  // let todos = req.body;
  // todoArray.push(req.body.todos);
  res.send(`You submitted ${id}!`);
});



app.listen(3000, function() {
  console.log('You started the application!');
});
