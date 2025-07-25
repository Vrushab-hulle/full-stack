const withAuth = (Component) => {
  //   const isAuthenticated = true; //auth logic
  return function ({ auth, ...props }) {
    //enhancment is done here and passed down to the component
    if (auth) {
      return <Component {...props} />;
    } else {
      return <p>Please login to acess</p>;
    }
  };
};

export default withAuth;
