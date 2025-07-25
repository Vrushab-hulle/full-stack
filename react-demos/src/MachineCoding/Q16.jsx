//Create a custom hook to manage the form input state.

import { useState } from "react";

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return {
    value,
    onChange: handleChange,
  };
};

const Q16 = () => {
  const nameInput = useFormInput("");
  return (
    <form>
      <input type="text" {...nameInput} placeholder="Name" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Q16;
