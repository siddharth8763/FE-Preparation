import { useState, createContext, useContext } from "react";

const UserContext = createContext();

function Component1() {
  const [user, setUser] = useState("Jesse Hall");

  return (
    <UserContext.Provider value={user}>
      <h1>Hello, {user}!</h1>
      <Component2 />
    </UserContext.Provider>
  );
}

function Component2() {
  return (
    <>
      <h1>Component 2</h1>
      <Component3 />
    </>
  );
}

// ...and so on for Component3, Component4, and Component5

function Component5() {
  const user = useContext(UserContext);

  return (
    <>
      <h1>Component 5</h1>
      <h2>Hello again, {user}!</h2>
    </>
  );
}


// for multiple values
const MyContext = createContext({
  counter1: 0,
  counter2: 0,
  setCounter1: () => {},
  setCounter2: () => {},
});

function App() {
    const [counter1, setCounter1] = useState(0);
    const [counter2, setCounter2] = useState(0);
  
    return (
      <MyContext.Provider
        value={{ counter1, counter2, setCounter1, setCounter2 }}
      >
        {/* Your component tree */}
      </MyContext.Provider>
    );
  }
  