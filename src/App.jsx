import React from "react";
import "./App.css";
import "./assets/scss/responsive.scss";
import Header from "./Components/Header/Header";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Database from "./Database";
import idb from "idb";
const App = () => {
	const [database, setDatabase] = useState();
	useEffect(() => {
		const stuff = async () => {
			const db = await idb.openDB("manto", 1, {
				upgrade(db, oldVersion, newVersion, transaction) {
					Database.first_time(db);
				},
			});

			setDatabase(db);
		};
		stuff();
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
