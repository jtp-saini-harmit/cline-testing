import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: string;
  userId: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

interface TodoState {
  items: Todo[];
}

const loadTodosFromStorage = (userId: string): Todo[] => {
  const todos = localStorage.getItem(`todos_${userId}`);
  return todos ? JSON.parse(todos) : [];
};

const saveTodosToStorage = (userId: string, todos: Todo[]) => {
  localStorage.setItem(`todos_${userId}`, JSON.stringify(todos));
};

const initialState: TodoState = {
  items: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    loadTodos: (state, action: PayloadAction<string>) => {
      state.items = loadTodosFromStorage(action.payload);
    },
    addTodo: (state, action: PayloadAction<{ userId: string; title: string }>) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        userId: action.payload.userId,
        title: action.payload.title,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      state.items.push(newTodo);
      saveTodosToStorage(action.payload.userId, state.items);
    },
    toggleTodo: (state, action: PayloadAction<{ userId: string; todoId: string }>) => {
      const todo = state.items.find(item => item.id === action.payload.todoId);
      if (todo) {
        todo.completed = !todo.completed;
        saveTodosToStorage(action.payload.userId, state.items);
      }
    },
    updateTodo: (state, action: PayloadAction<{ userId: string; todoId: string; title: string }>) => {
      const todo = state.items.find(item => item.id === action.payload.todoId);
      if (todo) {
        todo.title = action.payload.title;
        saveTodosToStorage(action.payload.userId, state.items);
      }
    },
    deleteTodo: (state, action: PayloadAction<{ userId: string; todoId: string }>) => {
      state.items = state.items.filter(item => item.id !== action.payload.todoId);
      saveTodosToStorage(action.payload.userId, state.items);
    },
    clearTodos: (state, action: PayloadAction<string>) => {
      state.items = [];
      saveTodosToStorage(action.payload, state.items);
    },
  },
});

export const { loadTodos, addTodo, toggleTodo, updateTodo, deleteTodo, clearTodos } = todoSlice.actions;
export default todoSlice.reducer;
