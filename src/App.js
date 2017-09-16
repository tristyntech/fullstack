import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      todos: []
    }

    this.getTodosFromServer()
  }

  getTodosFromServer() {
    // Study promises
    // Study fetch / $.ajax requests
    fetch('http://localhost:3001/todos')
      .then((res) => {
        return res.json()
      })
      .then((todos) => {
        this.setState({ todos: todos })
      })
  }

  postTodosFromServer(text) {
    var config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: text })
    }

    fetch('http://localhost:3001/todos', config)
      .then((res) => {
        return res.json()
      })
      .then((todos) => {
        this.setState({ todos: todos })
      })
  }

  onAddTodoClick() {
    var text = document.getElementById('todoInput').value
    // var newTodos = this.state.todos.concat([[text, false]])

    // Make request to the server to create a new todo
    this.postTodosFromServer(text)
    document.getElementById('todoInput').value = ''
  }

  deleteThing(index) {
    var newTodos = this.state.todos.slice(0, index).concat(this.state.todos.slice(index + 1))
    this.setState({ todos: newTodos });
  }

  toggleTodo(index) {
    var newTodo = this.state.todos[index]
    newTodo[1] = !newTodo[1]
    var newTodos = this.state.todos.slice(0, index).concat([newTodo]).concat(this.state.todos.slice(index + 1))
    this.setState({ todos: newTodos })
  }

  render() {
    return (
      <div>
        <h3>My Todo List</h3>

        <input id="todoInput" type="text" name="todo" />
        <button type="submit" onClick={() => { this.onAddTodoClick() }}>add todo</button>

        <ul>
          {this.state.todos.map((todo, index) => {
            var className = ''
            if (todo[1] === true) {
              className = 'strike-through'
            }

            return (
              <li key={todo}>
                <span onClick={ () => { this.toggleTodo(index) }} className={className}>{todo[0]}</span>
                <button onClick={() => { this.deleteThing(index) }}>X</button>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default App;
