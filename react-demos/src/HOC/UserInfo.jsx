import React from "react";

const UserInfo = (props) => {
  const { count, incrementCount } = props;
  return (
    <div>
      <p>Count is : {count}</p>

      <button onClick={incrementCount}>Increment Count</button>
    </div>
  );
};

export default UserInfo;
