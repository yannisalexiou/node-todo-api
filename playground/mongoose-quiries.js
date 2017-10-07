const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')

var id = '59d904f6fd5afc0ec01bc9f7';
var userId = "59d8040aef2bd023984f8802";

User.find({
  _id: userId
}).then((users) => {
  console.log('Users', users);
});

User.findOne({
  _id: userId
}).then((user) => {
  console.log('User', user);
});

User.findById(userId).then((user) => {
  if(!user) {
    return console.log('Id not found');
  }
});

// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }
// http://mongoosejs.com/docs/queries.html
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// //If you want find document by something other that id
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });
//
// //If you want find document by id
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));
