import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme } from './theme/theme.ts';
import { store } from './store/store.ts';
import { useSelector } from 'react-redux';
import { RootState } from './store/store.ts';
import Login from './components/Login.tsx';
import TodoList from './components/TodoList.tsx';

const AppContent: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return isAuthenticated ? <TodoList /> : <Login />;
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
