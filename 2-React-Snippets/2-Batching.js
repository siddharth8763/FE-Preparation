// However, as you might recall from the previous section, each render’s state values are fixed, 
// so the value of number inside the first render’s event handler is always 0, 
// no matter how many times you call setNumber(1):
// op will be increased by 1

export default function Counter() {
  const [number, setNumber] = React.useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}

// here the op will increase 3 times

export default function Counter1() {
  const [number, setNumber] = React.useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(n => n + 1);
        setNumber(n => n + 1);
        setNumber(n => n + 1);
      }}>+3</button>
    </>
  )
}


// here the op will be increase by 6 times

export default function Counter2() {
  const [number, setNumber] = React.useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setNumber(n => n + 1);
      }}>Increase the number</button>
    </>
  )
}

// setNumber(number + 5): number is 0, so setNumber(0 + 5). React adds “replace with 5” to its queue.
// setNumber(n => n + 1): n => n + 1 is an updater function. React adds that function to its queue.
// setNumber(42): React adds “replace with 42” to its queue.

export default function Counter3() {
    const [number, setNumber] = useState(0);
  
    return (
      <>
        <h1>{number}</h1>
        <button onClick={() => {
          setNumber(number + 5);
          setNumber(n => n + 1);
          setNumber(42);
        }}>Increase the number</button>
      </>
    )
  }
  