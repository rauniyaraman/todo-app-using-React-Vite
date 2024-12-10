// src/App.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, removeTodo, editTodo } from './redux/todoSlice';

function App() {
  const [newTodo, setNewTodo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState('');
  const [editId, setEditId] = useState(null);

  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo));
      setNewTodo('');
    }
  };

  const handleEditTodo = () => {
    if (editText.trim()) {
      dispatch(editTodo({ id: editId, newText: editText }));
      setEditText('');
      setIsEditing(false);
      setEditId(null);
    }
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  const handleStartEditing = (id, text) => {
    setEditId(id);
    setEditText(text);
    setIsEditing(true);
  };

  return (
    <div className="App">
      <h1>To-Do App</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>

      {isEditing && (
        <div>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Edit your task"
          />
          <button onClick={handleEditTodo}>Save</button>
        </div>
      )}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => handleToggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => handleStartEditing(todo.id, todo.text)}>Edit</button>
            <button onClick={() => handleRemoveTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
