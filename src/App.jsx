import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import { Routes, BrowserRouter, Route } from "react-router-dom";
const App = () => {
	return (
		<div className="App">
			<BrowserRouter>
				<Header></Header>
				<Routes>
					<Route path="/" element={<h1>HOME PAGE</h1>} />
					<Route path="/1" element={<h1>ABOUT US</h1>} />
					<Route path="/2" element={<h1>CONTACT US</h1>} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
