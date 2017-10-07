const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e); //400 = bad request
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET /todos/1234324
app.get('/todos/:id', (req, res) => {
  //res.send(req.params);
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo: todo});

  }).catch((e) => {
    res.status(400).send();
  })

  // Valid id using isValid
    // 404 - send back empty send

  // findById
    // success
      // if todo - send it back
      // if not todo - send back 404 with empty body
    // error
      // 400 - and send empty body back

});

app.delete('/todos/:id', (req, res) => {
  // get the id
  //request.params is where all are url parameters are stored
  var id = req.params.id;

  // validate the id -> not valid? return 404
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo: todo});
  }).catch((e) => {
    res.status(400).send();
  });

  // remove todo by id
    // success
      // if no doc, send 404
      //if doc, send doc back with 200
    // error
      // 400 with empty body
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  //the following var has all the things user passed to us
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt == new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }

    res.send({todo: todo});
  }).catch((e) => {
    res.status(400).send();
  })

});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
