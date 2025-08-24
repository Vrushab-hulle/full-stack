import React, { useState } from "react";

function BatchingExample() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("Shubham");

    const handleClick = () => {
        console.log("Before updates:", count, name);

        // Multiple updates
        setCount(count + 1);
        setName("Updated Name");

        console.log("After updates (still old values due to batching):", count, name);
    };

    return (
        <div>
            <h2>React State Batching Example</h2>
            <p>Count: {count}</p>
            <p>Name: {name}</p>
            <button onClick={handleClick}>Update State</button>
        </div>
    );
}

export default BatchingExample;