//eslint-disable

// src/actions/actionTypes.js
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const TOGGLE_THEME = 'TOGGLE_THEME';

// src/actions/counterActions.js
import { INCREMENT, DECREMENT } from './actionTypes';

export const increment = () => ({
  type: INCREMENT
});

export const decrement = () => ({
  type: DECREMENT
});

// src/actions/themeActions.js
import { TOGGLE_THEME } from './actionTypes';

export const toggleTheme = () => ({
  type: TOGGLE_THEME
});


// src/reducers/themeReducer.js
const initialState = { theme: 'light' };

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light'
      };
    default:
      return state;
  }
};

export default themeReducer;


// src/reducers/counterReducer.js
import { INCREMENT, DECREMENT } from '../actions/actionTypes';

const initialState = { count: 0 };

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

export default counterReducer;


// src/reducers/rootReducer.js
import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import themeReducer from './themeReducer';

// Combine both the counter and theme reducers
const rootReducer = combineReducers({
  counter: counterReducer,
  theme: themeReducer
});

export default rootReducer;


// src/store/store.js
import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';

const store = createStore(
  rootReducer, // Use combined root reducer
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;


// src/components/ThemeToggler.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../actions/themeActions';

const ThemeToggler = () => {
  // Access theme from the Redux store
  const theme = useSelector((state) => state.theme.theme);
  
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Current Theme: {theme}</h1>
      <button onClick={() => dispatch(toggleTheme())}>
        Toggle Theme
      </button>
    </div>
  );
};

export default ThemeToggler;


// src/components/Counter.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../actions/counterActions';

const Counter = () => {
  // useSelector is used to access state from the Redux store
  const count = useSelector((state) => state.count);
  
  // useDispatch is used to dispatch actions to the Redux store
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default Counter;


// src/App.js
import React from 'react';
import Counter from './components/Counter';
import ThemeToggler from './components/ThemeToggler';

const App = () => {
  return (
    <div>
      <h1>Redux with Multiple Reducers Example</h1>
      <Counter />
      <ThemeToggler />
    </div>
  );
};

export default App;


// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

