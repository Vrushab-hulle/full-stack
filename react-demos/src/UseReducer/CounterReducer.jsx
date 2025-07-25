import React, { useReducer } from "react";
export const intialValue = { count: 0, isUpdated: "false" };

export const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1, isUpdated: "true" };

    default:
      break;
  }
};
