import React from "react";
import "./App.css";
import "./assets/scss/responsive.scss";
import Header from "./Components/Header/Header";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Database from "./Database";
const App = () => {
	const [database, setDatabase] = useState();
	useEffect(() => {
		const request = indexedDB.open("manto", 1);
		request.onsuccess = (e) => {
			const db = e.target.result;
			setDatabase(db);
		};
		request.onupgradeneeded = (e) => {
			const db = e.target.result;
			Database.first_time(db);
		};
		request.onerror = (e) => {
			alert(`Database error: ${e.target.errorCode}`);
		};
	}, []);
	return (
		<div className="app">
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
