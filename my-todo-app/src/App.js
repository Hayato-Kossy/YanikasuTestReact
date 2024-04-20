import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import './App.css';
function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then(response => response.json())
      .then(data => setTodos(data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  const addTodo = (newTodo) => {
    fetch("http://localhost:3000/todos", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo)
    })
    .then(response => response.json())
    .then(todo => setTodos([...todos, todo]))
    .catch(error => console.error('Error adding todo:', error));
  };
  const updateTodo = (id, updatedTodo) => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTodo)
    })
    .then(response => response.json())
    .then(todo => setTodos(todos.map(t => t.id === todo.id ? todo : t)))
    .catch(error => console.error('Error updating todo:', error));
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE'
    })
    .then(() => setTodos(todos.filter(todo => todo.id !== id)))
    .catch(error => console.error('Error deleting todo:', error));
  };

  return (
    <div className="App">
      <h1>ToDo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todos={todos} onUpdateTodo={updateTodo} onDeleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
