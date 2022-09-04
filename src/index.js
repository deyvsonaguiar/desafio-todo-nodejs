const express = require('express');
const cors = require('cors');

const { v4: uuid } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());
app.listen(3000)

const users = [];

function checksExistsUserAccount(request, response, next) {
  // Complete aqui
}

app.post('/users', (request, response) => {
  
  const { name, username } = request.body

  const ifAlreadyExists = users.some(
    users => users.name === name | users.username === username
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
  // Complete aqui
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
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