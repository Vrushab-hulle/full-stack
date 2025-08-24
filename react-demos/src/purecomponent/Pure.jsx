import React, { useState } from "react";

// 🔸 Normal component (always re-renders)
function NormalComponent({ name }) {
    console.log("NormalComponent re-rendered");
    return <h2>Normal: {name}</h2>;
}

// 🔹 Pure component (only re-renders when props change)
const PureComponent = React.memo(function PureComponent({ name }) {
    console.log("PureComponent re-rendered");
    return <h2>Pure: {name}</h2>;
});

function Pure() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("Name");

    return (
        <div>
            <h1>React Normal vs Pure Component</h1>
            <button onClick={() => setCount(count + 1)}>Increment Count</button>
            <button onClick={() => setName("Updated Name")}>Change Name</button>
            <p>Count: {count}</p>

            {/* Passing same props every render */}
            <NormalComponent name={name} />
            <PureComponent name={name} />
        </div>
    );
}

export default Pure;
