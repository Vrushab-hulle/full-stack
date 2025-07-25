import React, { useEffect, useState } from "react";
import handleOtherMethod from "./components/helper";
import User from "./components/User";

const App = (props) => {
  const [data, setData] = useState("");
  const [toggle, setToggle] = useState(false);
  const [name, setName] = useState("");
  const handleData = () => {
    setData("Hello");
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setToggle(true);
  //   }, 800);
  // }, []);
  return (
    <div className="App">
      {/* <p>First React Test Case</p> */}
      {/* <input type="text" placeholder="enter username" name="username" id="userId" /> */}
      {/* <img
        // title="Ai Image"
        src="https://images.deepai.org/machine-learning-models/d4b1dd3ee43648a997650dc7f9e6923f/panda.jpeg"
      /> */}
      <input
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder="enter name"
      />
      <button>print</button>
      {/* <h1>Jest Testing</h1>
      <button onClick={()=>setData('updated data')}>Update Data</button>
      <h1>{data}</h1> */}

      {/* <h1>Functional Component method testing</h1>
      <button data-testid="btn1" onClick={handleData}>
        Update
      </button>
      <button onClick={handleOtherMethod}>Check Console</button>
      <h2>{data}</h2> */}

      {/* getByRole section */}
      {/* <input type="text" defaultValue={"hello"} disabled /> */}

      {/* Custom role section */}
      {/* <h1>Custom Role</h1>
      <button>Click 1</button>
      <button>Click 2</button>
      <label htmlFor="input1">User Name</label>
      <input type="text" id="input1" />
      <input type="text" />
      <div role="dummy">
        Dummy
      </div> */}

      {/* get All by Role */}
      {/* <h1>RTL Query: getAllByRole</h1>
      <button>Click Me</button>
      <button>Click Me</button> */}

      {/* get label Text */}
      {/* <label htmlFor="user-name">UserName</label>
      <input type="text" id="user-name" defaultValue={"kiran"} />
      <label htmlFor="skills">Skills</label>
      <input type="checkbox" id="skills" defaultChecked={true} /> */}

      {/*  get by test id and overidin test id */}
      {/* <h1>Overiding data-testid</h1> */}
      {/*  data-testid="test-div" */}
      {/* <div element-id='test-div'>Dummy Test</div> */}

      {/* findBy and findAllBy */}
      {/* {toggle ? <h1>data found</h1> : <h1>No data found</h1>} */}

      {/* on chnage event testing */}
      {/* <h2>{name}</h2>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        placeholder="enter username"
      /> */}

      {/* <h1>Props Testing</h1>
      <User name='rohit' /> */}

      {/* <h1>Functional props Testing</h1>
      <button onClick={props.testFunction}>Click</button> */}
    </div>
  );
};

export default App;
