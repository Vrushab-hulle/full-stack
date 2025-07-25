import React, { useEffect } from "react";

const BasicEffect = () => {
  useEffect(() => {
    console.log("Component mounted");
  }, []);
  return <div>BasicEffect</div>;
};

export default BasicEffect;
