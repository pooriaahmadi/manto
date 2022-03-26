import { QrReader } from "react-qr-reader";
import QrScanner from "qr-scanner";
import Database from "../Database";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../assets/scss/teamsload.scss";
import "../assets/scss/inputs.scss";

const chunkArrayInGroups = (arr, size) => {
	var myArray = [];
	for (var i = 0; i < arr.length; i += size) {
		myArray.push(arr.slice(i, i + size));
	}
	return myArray;
};
const TeamsLoad = ({ database, redirect = "/admin" }) => {
	const navigate = useNavigate();
	const [result, setResult] = useState("");
	const [method, setMethod] = useState(0);
	const handleMethodChange = (e) => {
		setMethod(parseInt(e.target.value));
	};
	const handleFileChange = (e) => {
		const image = new Image();
		image.src = URL.createObjectURL(e.target.files[0]);
		image.onload = async () => {
			const result = await QrScanner.scanImage(image);
			if (!result) return;
			setResult(result);
		};
	};
	const handleScan = (result) => {
		if (!result) return;
		setResult(result.text);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const teamSchema = ["id", "number", "name"];
		let teams = chunkArrayInGroups(
			result.split(","),
			teamSchema.length
		).map((item) => {
			return {
				id: parseInt(item[0]),
				number: parseInt(item[1]),
				name: item[2],
			};
		});
		if (method === 0) {
			await Database.Teams.clear({ db: database });
		} else if (method === 1) {
			const oldTeams = await Database.Teams.all({ db: database });
			teams = oldTeams
				.filter((x) => !teams.includes(x))
				.concat(teams.filter((x) => !oldTeams.includes(x)));
		}
		for (let i = 0; i < teams.length; i++) {
			const team = teams[i];
			try {
				await Database.insertTeam({
					db: database,
					number: team.number,
					name: team.name,
				});
			} catch (error) {
				console.error(error);
			}
		}
		navigate(redirect);
	};
	const handleError = (err) => {
		console.error(err);
	};
	return (
		<div className="load">
			{result === "" ? (
				<div className="scanner">
					<h1>Teams load</h1>
					<div className="controls">
						<input
							type="file"
							onChange={handleFileChange}
							id="file"
						/>
						<button
							onClick={() => {
								document.getElementById("file").click();
							}}
						>
							Load from an image
						</button>
					</div>
					<QrReader
						delay={300}
						onResult={handleScan}
						constraints={{ facingMode: "environment" }}
					></QrReader>
				</div>
			) : (
				<form onSubmit={handleSubmit}>
					<h1>Load method</h1>
					<div className="input">
						<h2>Method</h2>
						<select value={method} onChange={handleMethodChange}>
							<option value="0">
								Reset database and then add
							</option>
							<option value="1">
								Add differences between 2 databases
							</option>
						</select>
					</div>
					<input type="submit" value="Execute" />
				</form>
			)}
		</div>
	);
};

export default TeamsLoad;
