import { useState } from "react";

export const useCounter = (initialvalue) => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prevcount => prevcount + 1);
  const decrement = () => setCount(prevcount => prevcount - 1);

  return { count, increment, decrement };
};
