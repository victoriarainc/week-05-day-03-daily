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

last_id = 0;

// ============HOME PAGE===========

app.get("/", function(req, res) {
  res.render('bloop', {
    todos: todoArray,
    done: doneArray
  });
});
app.post("/", function(req, res) {
  last_id += 1;
  todoArray.push({
    id: last_id,
    text: req.body.item
  });

  res.redirect('/');
});

// =============SUBMIT PAGE===========

app.post("/:id", function(req, res) {
  let id = req.params.id;

  pending = todoArray.filter(function(li) {
    return li.id == id;
  });

  pending.forEach(function(li) {
    let index = todoArray.indexOf(li);
    if (index != -1) {
      todoArray.splice(index, 1);
    }
    doneArray.push(li);
  });

  res.redirect('/');
});

app.listen(3000, function() {
  console.log('You started the application!');
});
