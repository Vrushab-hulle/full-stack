import { useState } from 'react';

const BuggyComponent = () => {
  const [throwError, setThrowError] = useState(false);

  if (throwError) {
    throw new Error('I crashed! This is an intentional error for demonstration.');
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '20px' }}>
      <h2>Buggy Component</h2>
      <p>This component will throw an error when you click the button below.</p>
      <button onClick={() => setThrowError(true)}>
        Click to throw error
      </button>
    </div>
  );
};

export default BuggyComponent;