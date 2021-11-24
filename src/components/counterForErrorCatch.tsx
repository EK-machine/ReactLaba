import React, { useState } from "react";

const CounterForErrorCatch: React.FC = () => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };
  if (count === 3) {
    throw new Error("Oups! there is an Error");
  }

  return (
    <button type="button" onClick={handleClick}>
      Click me 3 times to get error. Count: {count}
    </button>
  );
};

export default CounterForErrorCatch;
