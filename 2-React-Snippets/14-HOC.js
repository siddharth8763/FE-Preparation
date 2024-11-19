import React from 'react';

// A simple component that displays a user's name
const User = ({ name }) => <h2>{name}</h2>;

// The Higher-Order Component
const withGreeting = (WrappedComponent) => {
  return (props) => (
    <div>
      <h1>Hello!</h1>
      <WrappedComponent {...props} />
    </div>
  );
};

// Wrapping the User component with the withGreeting HOC
const UserWithGreeting = withGreeting(User);

// Using the new component
const App = () => {
  return (
    <div>
      <UserWithGreeting name="John Doe" />
    </div>
  );
};

export default App;
