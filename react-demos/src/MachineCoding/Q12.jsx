// Higher-Order Component (HOC) that logs props

const withPropsLogger = (WrappedComponent) => {
  return (props) => {
    console.log('Current props:', props); 
    return <WrappedComponent {...props} />; 
  };
};

// Example usage:
export const Q12 = ({ name, age }) => (
  <div>
    <h1>User Info</h1>
    <p>Name: {name}</p>
    <p>Age: {age}</p>
  </div>
);
export default withPropsLogger; 