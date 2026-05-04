import React, { useCallback, useEffect, useMemo, useState } from "react";

const Newtest = () => {

  const [count, setCount] = useState(0);

  // Runs once after first render
  useEffect(() => {
    console.log("Component Mounted");
  }, []);

  // Memoized value
  const memoValue = useMemo(() => {
    console.log("useMemo executed");
    return count * 2;
  }, [count]);

  // Memoized function
  const increment = useCallback(() => {
    console.log("Increment clicked");
    setCount(prev => prev + 1);
  }, []);

  const decrement = useCallback(() => {
    console.log("Decrement clicked");
    setCount(prev => prev - 1);
  }, []);

  console.log("Component Rendered");

  return (
    <div>
      <h2>Count: {count}</h2>
      <h3>Memo Value: {memoValue}</h3>

      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default Newtest;