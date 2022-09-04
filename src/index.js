const express = require('express');
const cors = require('cors');

const { v4: uuid } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());
app.listen(3000)

const users = [];

//middleware
function checksExistsUserAccount(request, response, next) {
  
  const { username } = request.headers

  const user = users.find((user) => user.username === username)

  if(!user) {
    return response.status(404).json({ error: "User not found"})
  }

  request.user = user

  return next()
}

app.post('/users', (request, response) => {
  
  const { name, username } = request.body

  const ifAlreadyExists = users.some(
    users => users.username === username
  )

  if(ifAlreadyExists) {
    return response.status(400).json({error: "User already exists"})
  }

  users.push({
    id: uuid(),
    name, 
    username,
    todos: []
  })

  return response.status(201).json(users)


});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  
  const { user } = request

  return response.json(user)

});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  
  const { title, deadline } = request.body
  const { user } = request

  const todoOperation = {
    id: uuid(), // precisa ser um uuid
    title,
    done: false, 
    deadline: new Date(deadline), 
    created_at: new Date()
  }

  user.todos.push(todoOperation)

  return response.status(201).json(user.todos)


});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;