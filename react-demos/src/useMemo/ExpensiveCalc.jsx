import { useState, useMemo } from "react";
export function ExpensiveCalc() {
  const [numbers, setNumbers] = useState([1, 2, 3]);
  const [toggle, setToggle] = useState(false);
  const sum = useMemo(() => {
    console.log("Calculating sum...");
    return numbers.reduce((acc, num) => acc + num, 0);
  }, [numbers]);
  // const sum = ()=>{
  //   console.log("Calculating sum...");
  //   return numbers.reduce((acc, num) => acc + num, 0);
  // }
  return (
    <div>
      <p>Sum: {sum}</p>
      <button onClick={() => setToggle(!toggle)}>
        Toggle: {toggle.toString()}
      </button>{" "}
      <button onClick={() => setNumbers([...numbers, numbers.length + 1])}>
        Add Number
      </button>
    </div>
  );
}
