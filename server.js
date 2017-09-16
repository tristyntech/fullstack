var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')

// invoke express to get an instance of the Server

var app = express()
app.use(bodyParser.json())
app.use(cors())
// ************ BODY PARSER DOES THIS ***************
// app.use((req, res, next) => {
//   if (req.headers['Content-Type'] === 'application/json') {
//     var body = ''
//     req.on('data', (chunk) => {
//       body += chunk
//     })
//     req.on('end', () => {
//       req.body = JSON.parse(body)
//       next()
//     })
//   }
// })


var todos = [["helloTodo", false], ["hiTodo", false]]

app.get('/todos', (req, res) => {
  // res.something to close the connection between client & server
  res.json(todos)
})

app.post('/todos', (req, res) => {
  // Create the new todo
  var todo = [req.body.text, false]

  // Add the new todo to the todos list
  todos.push(todo)

  res.json(todos)
})

app.put('/todos/:index', (req, res) => {
  var index = req.params.index
  // toggle todo with :index
})

app.listen(3001, () => {
  console.log('Server is running at port: ', 3001)
})
