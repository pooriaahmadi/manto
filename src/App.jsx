import React from "react";
import "./App.css";
import "./assets/scss/responsive.scss";
import Header from "./Components/Header/Header";
import Admin from "./Pages/Admin";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Database from "./Database";
import * as idb from "idb";
import NewTeam from "./Pages/NewTeam";
import NewUser from "./Pages/NewUser";
import UserQRCode from "./Pages/UserQRCode";
import TeamsQRCode from "./Pages/TeamsQRCode";
import UsersQRCode from "./Pages/UsersQRCode";
import TeamsLoad from "./Pages/TeamsLoad";
import UsersLoad from "./Pages/UsersLoad";
import NewCategory from "./Pages/NewCategory";
import CategoriesQRCode from "./Pages/CategoriesQRCode";
import CategoriesLoad from "./Pages/CategoriesLoad";
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
					<Route
						path="/admin"
						element={<Admin database={database}></Admin>}
					/>
					<Route
						path="/teams/new"
						element={<NewTeam database={database}></NewTeam>}
					/>
					<Route
						path="/teams/qrcode"
						element={
							<TeamsQRCode database={database}></TeamsQRCode>
						}
					/>
					<Route
						path="/teams/qrcode/load"
						element={<TeamsLoad database={database}></TeamsLoad>}
					/>
					<Route
						path="/users/new"
						element={<NewUser database={database}></NewUser>}
					/>
					<Route
						path="/users/qrcode"
						element={
							<UsersQRCode database={database}></UsersQRCode>
						}
					/>
					<Route
						path="/users/qrcode/load"
						element={<UsersLoad database={database}></UsersLoad>}
					/>
					<Route
						path="/users/:id/qrcode"
						element={<UserQRCode database={database}></UserQRCode>}
					/>
					<Route
						path="/categories/new"
						element={<NewCategory database={database} />}
					/>
					<Route
						path="/categories/qrcode"
						element={<CategoriesQRCode database={database} />}
					/>
					<Route
						path="/categories/qrcode/load"
						element={<CategoriesLoad database={database} />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
