'use client'
import React, { createContext, useContext, useState } from 'react';
import { Tag, Todo } from "../types/types"

type TodoContextType = {
  todos: Todo[];
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>
  addTodo: (todo: Todo) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  checkTodo: (index: number) => void;
  cleanCompleted: () => void;
  deleteTodo: (index:number)=> void;
  addTag: (index: number, tag: Tag) => void;
  removeTag: (index: number, tag: Tag) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>('')

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const checkTodo = (index: number) => {
    const newTodos = [...todos]
    newTodos[index].completed = !newTodos[index].completed
    setTodos(newTodos);
  }

  const cleanCompleted = () => {
    const newTodos = todos.filter(t => !t.completed)
    setTodos(newTodos)
  }

  const deleteTodo = (index:number) => {
    const newTodos: Todo[] = [];
    todos.map((todo, i) => {
      if (i !== index) {
        newTodos.push(todo)
      }
    })
    setTodos(newTodos);
  }

  const addTag = (index: number, tag:Tag) => {
    const newTodos: Todo[] = [];
    todos.map((todo, i) => {
      if (i !== index) {
        newTodos.push(todo)
      }else{
        const newTodo = {...todo, tags: [...todo.tags, tag]}
        newTodos.push(newTodo);
      }
    })
    setTodos(newTodos);
  }

  const removeTag = (index: number, tag: Tag) => {
    const newTodos: Todo[] = [];
    todos.map((todo, i) => {
      if (i !== index) {
        newTodos.push(todo)
      }else{
        console.log(tag)
        const newTodo: Todo = {
          ...todo,
          tags: todo.tags.filter((t) => t.id !== tag.id)
        }
        console.log(newTodo)
        newTodos.push(newTodo);
      }
    })
    setTodos(newTodos);
  }



  return (
    <TodoContext.Provider value={{
      todos, setTodos, addTodo, checkTodo, filter,
      setFilter, cleanCompleted, deleteTodo, addTag, removeTag
    }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};
