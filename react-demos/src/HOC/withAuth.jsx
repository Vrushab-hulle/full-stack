import { useState } from "react";

const withAuth = (Component) => {
  const [count, setCount] = useState(0);
  return function () {
    return (
      <Component count={count} incrementCount={() => setCount(count + 1)} />
    );
  };
};

export default withAuth;
