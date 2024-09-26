// src/actions/actionTypes.js
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';


// src/actions/authActions.js
import axios from 'axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from './actionTypes';

// Login action using redux-thunk
export const login = (username, password) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const response = await axios.post('/api/login', { username, password });
      
      // On successful login
      const token = response.data.token;
      dispatch({ type: LOGIN_SUCCESS, payload: token });

      // Optionally store the token in local storage
      localStorage.setItem('token', token);
    } catch (error) {
      // On login failure
      dispatch({ type: LOGIN_FAILURE, error: error.response.data.message || 'Login failed' });
    }
  };
};

// Logout action
export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT });
  };
};


// src/reducers/authReducer.js
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT
  } from '../actions/actionTypes';
  
  const initialState = {
    loading: false,
    isAuthenticated: false,
    token: null,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        return { ...state, loading: true, error: null };
  
      case LOGIN_SUCCESS:
        return { ...state, loading: false, isAuthenticated: true, token: action.payload, error: null };
  
      case LOGIN_FAILURE:
        return { ...state, loading: false, isAuthenticated: false, error: action.error };
  
      case LOGOUT:
        return { ...state, loading: false, isAuthenticated: false, token: null, error: null };
  
      default:
        return state;
    }
  };
  
  export default authReducer;

  
  // src/store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;


// src/components/Login.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/authActions';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const { loading, isAuthenticated, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome! You are logged in.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Login;


// src/components/Logout.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/authActions';

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;

// src/App.js
import React from 'react';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Logout from './components/Logout';

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div>
      <h1>Redux Thunk Login Flow</h1>
      {isAuthenticated ? <Logout /> : <Login />}
    </div>
  );
};

export default App;


// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
