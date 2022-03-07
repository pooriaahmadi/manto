import React, { useState } from "react";

const Counter = (props) => {
	const [count, setCount] = useState(0);
	const increment = () => {
		setCount(count + 1);
	};
	const decrement = () => {
		setCount(count - 1);
	};
	return (
		<div style={{ textAlign: "center" }}>
			<h3>Counter app</h3>
			<div>
				<button onClick={increment}>increase</button>
				<span>{count}</span>
				<button onClick={decrement}>decrease</button>
			</div>
		</div>
	);
};

export default Counter;
