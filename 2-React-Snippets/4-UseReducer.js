// useReducer is very similar to useState, but it lets you move the state update logic 
// from event handlers into a single function outside of your component. 

import React, { useReducer } from 'react';
import './style.css';

function reducer(state, action) {
  if (action.type === `inc_data`) {
    return {
      ...state,
      data: state.data + 1,
    };
  } else if (action.type === `ìnc_ct_times`) {
    return {
      ...state,
      clickedTimes: state.clickedTimes + 1,
    };
  }
  return state;
}

export default function App() {
  const [state, dispacth] = useReducer(reducer, {
    data: 0,
    clickedTimes: 0,
  });

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <h1>data: {state.data}</h1>
      <h1>clikedTimes: {state.clickedTimes}</h1>
      <button onClick={() => dispacth({ type: `inc_data` })}>+data</button>
      <button onClick={() => dispacth({ type: `ìnc_ct_times` })}>
        +clikedTimes
      </button>
    </div>
  );
}
