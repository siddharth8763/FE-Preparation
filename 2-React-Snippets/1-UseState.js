// Synchronizing State and UI
// One of the challenges with managing previous state is ensuring that the UI is 
// in sync with the state changes. React's batched updates and asynchronous nature can sometimes lead to discrepancies if handled incorrectly.

// Handling Asynchronous State Updates
// As state updates may not be applied immediately, developers must use the functional form of the 
// setter function to ensure they are working with the most recent state value. 
// This is particularly important when the new state depends on the previous state.

function Counter() {
  const [count, setCount] = React.useState(0);

  function handleIncrement() {
    setCount((prevCount) => prevCount + 1);
  }

  return <button onClick={handleIncrement}>Count: {count}</button>;
}
