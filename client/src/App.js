import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import 'materialize-css';
import { AuthContext } from './context/AuthContext';

function App() {
  const { login, logout, token, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider value={{ token, login, logout, userId, isAuthenticated }}>
      <BrowserRouter>
        <div>
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
