const withAuth = (WrappedComponent) => {
  return (props) => {
    const isLoggedIn = true; // pretend we got this from context or state

    if (!isLoggedIn) {
      return <h3>⚠️ Please login to continue</h3>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
