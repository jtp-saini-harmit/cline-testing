import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';
import {
  addTodo,
  toggleTodo,
  updateTodo,
  deleteTodo,
  loadTodos,
} from '../store/todoSlice.ts';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const todos = useSelector((state: RootState) => state.todos.items);
  const [newTodo, setNewTodo] = useState('');
  const [editTodo, setEditTodo] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    if (user) {
      dispatch(loadTodos(user.id));
    }
  }, [dispatch, user]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() && user) {
      dispatch(addTodo({ userId: user.id, title: newTodo.trim() }));
      setNewTodo('');
    }
  };

  const handleToggle = (todoId: string) => {
    if (user) {
      dispatch(toggleTodo({ userId: user.id, todoId }));
    }
  };

  const handleEditClick = (todo: { id: string; title: string }) => {
    setEditTodo(todo);
  };

  const handleEditSave = () => {
    if (editTodo && user) {
      dispatch(
        updateTodo({
          userId: user.id,
          todoId: editTodo.id,
          title: editTodo.title,
        })
      );
      setEditTodo(null);
    }
  };

  const handleDelete = (todoId: string) => {
    if (user) {
      dispatch(deleteTodo({ userId: user.id, todoId }));
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleAddTodo}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo"
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!newTodo.trim()}
            >
              Add
            </Button>
          </Box>
        </form>
      </Paper>

      <Paper elevation={3} sx={{ p: 0 }}>
        <List>
          {todos.length === 0 ? (
            <ListItem>
              <ListItemText
                primary={
                  <Typography align="center" color="textSecondary">
                    No todos yet
                  </Typography>
                }
              />
            </ListItem>
          ) : (
            todos.map((todo) => (
              <ListItem
                key={todo.id}
                sx={{
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  '&:last-child': { borderBottom: 'none' },
                }}
              >
                <Checkbox
                  edge="start"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                />
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        textDecoration: todo.completed ? 'line-through' : 'none',
                        color: todo.completed ? 'text.secondary' : 'text.primary',
                      }}
                    >
                      {todo.title}
                    </Typography>
                  }
                  secondary={new Date(todo.createdAt).toLocaleDateString()}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => handleEditClick({ id: todo.id, title: todo.title })}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" onClick={() => handleDelete(todo.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          )}
        </List>
      </Paper>

      <Dialog open={!!editTodo} onClose={() => setEditTodo(null)}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            value={editTodo?.title || ''}
            onChange={(e) =>
              setEditTodo((prev) =>
                prev ? { ...prev, title: e.target.value } : null
              )
            }
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditTodo(null)}>Cancel</Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TodoList;
