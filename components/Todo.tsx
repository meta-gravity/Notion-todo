"use client"

import React, { useState } from 'react';
import { Input } from './ui/input';
import { Form } from './ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from './ui/button';
import { CalendarIcon } from '@radix-ui/react-icons';
 

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [date, setDate] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [todoImportance, setTodoImportance] = useState('');

  const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputValue(e.target.value);
  };

  const handleDateChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setDate(e.target.value);
  };

  const handleFormSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (inputValue.trim()) {
      if (editIndex === -1) {
        setTodos([...todos, { task: inputValue.trim(), date, done: false, importance: todoImportance }]);
      } else {
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = { task: inputValue.trim(), date, done: false, importance: todoImportance };
        setTodos(updatedTodos);
        setEditIndex(-1);
      }
      setInputValue('');
      setDate('');
      setTodoImportance('');
    }
  };

  const handleDeleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index: React.SetStateAction<number>) => {
    setInputValue(todos[index].task);
    setDate(todos[index].date);
    setTodoImportance(todos[index].importance);
    setEditIndex(index);
  };

  const handleDoneTodo = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos[index].done = !updatedTodos[index].done;
    setTodos(updatedTodos);
  };

  const handleExpandTodo = (index: number) => {
    console.log('Expand todo', index);
  };

  const handleShowDeleteConfirm = (index: React.SetStateAction<number>) => {
    setEditIndex(index);
    setShowDeleteConfirm(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setEditIndex(-1);
  };

  const handleConfirmDelete = () => {
    handleDeleteTodo(editIndex);
    setShowDeleteConfirm(false);
    setEditIndex(-1);
  };

  const handleShowHistory = () => {
    setShowHistory(true);
  };

  const handleHideHistory = () => {
    setShowHistory(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white w-96 p-6 rounded shadow-lg">
        <h1 className="text-4xl font-bold mb-8">Todo App</h1>
        <form onSubmit={handleFormSubmit} className="mb-6">
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-4 rounded"
            placeholder="Enter a task"
            required
          />
          <Input
            type="date"
            value={date}
            onChange={handleDateChange}
            className="w-full border border-gray-300 p-4 rounded mt-4"
            required
          />
          {/* <CalendarIcon /> */}
          
          <Select
            value={todoImportance}
            onChange={(e) => setTodoImportance(e.target.value)}

            className="w-full border border-gray-300 p-4 rounded mt-4"
            required
          >
          <SelectContent>
            <SelectGroup>
              <SelectLabel >Select Importance</SelectLabel>
              <SelectItem value="important">Important</SelectItem>
              <SelectItem value="urgent">Banana</SelectItem>
              <SelectItem value="less important">Blueberry</SelectItem>
            </SelectGroup>
          </SelectContent>
            {/* <option value="">Select Importance</option>
            <option value="important">Important</option>
            <option value="urgent">Urgent</option>
            <option value="less-important">Less Important</option> */}
          </Select>
          <Button
            type="submit"
            className="bg-blue-500 text-white px-6 py-4 rounded ml-4"
          >
            {editIndex === -1 ? 'Add' : 'Update'}
          </Button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <li
              key={index}
              className={`flex items-center justify-between py-4 border-b ${
                todo.done ? 'line-through' : ''
              }`}
              style={{ transition: 'all 0.3s' }}
            >
              <div>
                <span
                  className={`font-bold ${todo.done ? 'text-gray-500' : ''}`}
                  style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                >
                  {todo.task}
                </span>
                <span className={`text-gray-500 ml-2 ${todo.done ? 'line-through' : ''}`}>
                  {todo.date}
                </span>
                <span className={`text-gray-500 ml-2 ${todo.done ? 'line-through' : ''}`}>
                  {todo.importance}
                </span>
              </div>
              <div>
                {!todo.done && (
                  <button
                    className="text-green-500"
                    onClick={() => handleDoneTodo(index)}
                  >
                    Done
                  </button>
                )}
                <Button
                  className={`text-blue-500 ml-4 ${todo.done ? 'line-through' : ''}`}
                  onClick={() => handleEditTodo(index)}
                >
                  Edit
                </Button>
                <Button
                  className={`text-red-500 ml-4 ${todo.done ? 'line-through' : ''}`}
                  onClick={() => handleShowDeleteConfirm(index)}
                >
                  Delete
                </Button>
                {todo.task.length > 20 && (
                  <Button
                    className={`text-blue-500 ml-4 ${todo.done ? 'line-through' : ''}`}
                    onClick={() => handleExpandTodo(index)}
                  >
                    Expand
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
        {showDeleteConfirm && (
          <div className="my-4">
            <p>Are you sure you want to delete this todo?</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-6 py-4 rounded"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-6 py-4 rounded ml-4"
                onClick={handleConfirmDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        )}
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 text-white px-6 py-4 rounded"
            onClick={handleShowHistory}
          >
            History
          </button>
        </div>
        {showHistory && (
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-4">History</h2>
            <ul>
              {todos.map((todo, index) => (
                <li key={index} className="mb-2">
                  <span
                    className={`font-bold ${todo.done ? 'text-gray-500' : ''}`}
                  >
                    {todo.task}
                  </span>
                  <span className={`text-gray-500 ml-2 ${todo.done ? 'line-through' : ''}`}>
                    {todo.date}
                  </span>
                  <span className={`text-gray-500 ml-2 ${todo.done ? 'line-through' : ''}`}>
                    {todo.importance}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 text-white px-6 py-4 rounded"
                onClick={handleHideHistory}
              >
                Hide
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoApp;