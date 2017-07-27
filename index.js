// ===========PACKAGES===========

const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const bodyParser = require('body-parser')

// =========BOILER PLATE===========

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(bodyParser());

// =============ARRAYS===============

const todoArray = [];
const doneArray = [];

let last_id = 0;

// ============HOME PAGE===========

app.get("/", function(req, res) {
  // renders home template
  res.render('bloop', {
    todos: todoArray,
    done: doneArray
  });
});

app.post("/", function(req, res) {

  // stores and tracks how many items have been added
  last_id += 1;

  // pushes input into the todoArray
  todoArray.push({
    id: last_id,
    text: req.body.item
  });

  // forces a refresh with our new data
  res.redirect('/');
});

// =============SUBMIT PAGE===========

app.post("/:id", function(req, res) {

  // sets the id of the item that the user clicked
  let id = req.params.id;

  // finds items in the todoArray
  // stores it in pending
  pending = todoArray.filter(function(li) {
    return li.id == id;
  });

  // for each item that was found
  // remove it from todoArray
  // and push into doneArray
  pending.forEach(function(li) {

    // finds the completed item and removes it
    let index = todoArray.indexOf(li);
    if (index != -1) {
      todoArray.splice(index, 1);
    }

    // moves that completed item into the doneArray
    doneArray.push(li);
  });

  // forces refresh
  res.redirect('/');
});

// begins the server
app.listen(3000, function() {
  console.log('You started the application!');
});
