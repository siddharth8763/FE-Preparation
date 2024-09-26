// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for handling login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token); // Store token in localStorage
        return thunkAPI.dispatch(loginSuccess(data.token)); // Dispatch action to store token
      } else {
        return thunkAPI.rejectWithValue(data.message); // Return error message on failure
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('Network error'); // Handle network errors
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isAuthenticated: false,
    error: null,
    loading: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;  // Store token in Redux state
      state.isAuthenticated = true;
      state.error = null;
      state.loading = false;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');  // Clear token from localStorage on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;  // Set error in state if login fails
      });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;


// profileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk for fetching the user profile
export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;  // Retrieve token from Redux state

    try {
      const response = await fetch('/api/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,  // Add token to the Authorization header
        },
      });

      const data = await response.json();
      if (response.ok) {
        return thunkAPI.dispatch(fetchProfileSuccess(data));  // Dispatch success if API call is successful
      } else {
        return thunkAPI.rejectWithValue(data.message);  // Return error message if API call fails
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch profile');  // Handle network errors
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: {},
    status: 'idle',
    error: null,
  },
  reducers: {
    fetchProfileSuccess: (state, action) => {
      state.profile = action.payload;  // Save profile data to Redux state
      state.status = 'succeeded';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;  // Set error in state if fetching fails
      });
  },
});

export const { fetchProfileSuccess } = profileSlice.actions;
export default profileSlice.reducer;


// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import profileReducer from './profileSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});

export default store;


// Login.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));  // Dispatch loginUser thunk to handle login
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;


// Profile.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from './profileSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, status, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchUserProfile());  // Dispatch fetchUserProfile thunk to fetch the user profile
  }, [dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>{error}</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
    </div>
  );
};

export default Profile;


// Logout.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from './authSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());  // Dispatch logout to clear the token and session
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;


// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
