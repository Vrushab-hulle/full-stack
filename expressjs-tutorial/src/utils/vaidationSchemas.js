export const createUservalidationSchema = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage:
        "username must be atleast 5 charchters with max of 32 charchters",
    },
    notEmpty: {
      errorMessage: "userName cannot be empty",
    },
    isString: {
      errorMessage: "userName must be string",
    },
  },
};
