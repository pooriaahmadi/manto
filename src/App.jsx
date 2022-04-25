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
import NewProperty from "./Pages/NewProperty";
import Scout from "./Pages/Scout";
import TeamScout from "./Components/Teams/TeamScout";
import Home from "./Pages/Home";
import MatchEdit from "./Pages/MatchEdit";
import NewMatch from "./Pages/NewMatch";
import QualificationMatches from "./Pages/QualificationMatches";
import QueuePage from "./Pages/QueuePage";
import QueueQRCode from "./Pages/QueueQRCode";
import QueueLoad from "./Pages/QueueLoad";
import Analytics from "./Pages/Analytics";
import Footer from "./Components/Footer/Footer";
import About from "./Pages/About";
import "./assets/scss/colors.scss";

const App = () => {
	const [database, setDatabase] = useState();
	const [queue, setQueue] = useState(0);
	useEffect(() => {
		const stuff = async () => {
			const db = await idb.openDB("manto", 13, {
				async upgrade(db, oldVersion, newVersion, transaction) {
					const objectStores = [
						"users",
						"teams",
						"properties",
						"categories",
						"answers",
						"matches",
						"waiting_matches",
						"qualification_matches",
						"dublicates",
						"pitanswers",
						"pitproperties",
						"comments",
					];
					for (let i = 0; i < objectStores.length; i++) {
						try {
							await db.deleteObjectStore(objectStores[i]);
						} catch (error) {}
					}
					await Database.first_time(db);
				},
			});
			const waitingMatches = await Database.WaitingMatches.all({
				db: db,
			});
			setQueue(waitingMatches.length);
			setDatabase(db);
		};
		stuff();
	}, []);
	const increaseQueue = () => {
		setQueue(queue + 1);
	};
	const decreaseQueue = () => {
		setQueue(queue - 1);
	};
	return (
		<div className="app">
			<BrowserRouter>
				<Header queue={queue} />
				<Routes>
					<Route path="/" element={<Home database={database} />} />
					<Route
						path="/admin"
						element={<Admin database={database}></Admin>}
					/>
					<Route
						path="/scout"
						element={<Scout database={database}></Scout>}
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
						path="/teams/qrcode/load/scout"
						element={
							<TeamsLoad
								database={database}
								redirect="/scout"
							></TeamsLoad>
						}
					/>
					<Route
						path="/teams/:id/scout"
						element={
							<TeamScout
								database={database}
								increaseQueue={increaseQueue}
								decreaseQueue={decreaseQueue}
							></TeamScout>
						}
					/>
					<Route
						path="/teams/:teamId/matches/new"
						element={
							<NewMatch
								database={database}
								increaseQueue={increaseQueue}
							/>
						}
					/>
					<Route
						path="/teams/:teamId/matches/:matchId/edit"
						element={
							<MatchEdit
								database={database}
								decreaseQueue={decreaseQueue}
							/>
						}
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
					<Route
						path="/categories/qrcode/load/scout"
						element={
							<CategoriesLoad
								database={database}
								redirect="/scout"
							/>
						}
					/>
					<Route
						path="/properties/category/:id/new"
						element={<NewProperty database={database} />}
					/>
					<Route
						path="/qualification_matches"
						element={
							<QualificationMatches
								database={database}
								increaseQueue={increaseQueue}
							/>
						}
					/>
					<Route
						path="/queue"
						element={
							<QueuePage
								database={database}
								decreaseQueue={decreaseQueue}
							/>
						}
					/>
					<Route
						path="/queue/qrcode"
						element={
							<QueueQRCode
								database={database}
								decreaseQueue={decreaseQueue}
							/>
						}
					/>
					<Route
						path="/queue/load"
						element={<QueueLoad database={database} />}
					/>
					<Route
						path="/analytics"
						element={<Analytics database={database} />}
					/>
					<Route path="/aboutus" element={<About />} />
				</Routes>
				<Footer></Footer>
			</BrowserRouter>
		</div>
	);
};

export default App;
