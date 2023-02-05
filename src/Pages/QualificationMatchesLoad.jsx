import { QrReader } from "react-qr-reader";
import QrScanner from "qr-scanner";
import Database from "../Database";
import { useState } from "react";
import "../assets/scss/teamsload.scss";
import "../assets/scss/inputs.scss";

const QualificationMatchesLoad = ({ database }) => {
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
			handleSubmit(result);
		};
	};
	const handleScan = (result) => {
		if (!result) return;
		setResult(result.text);
		// handleSubmit(result.text);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		let results = result.split("|");
		let teams = await Database.Teams.all({ db: database });
		teams = teams.map((team) => team.number);
		if (method === 0) {
			await Database.QualificationMatches.clear({ db: database });
		}
		for (let i = 0; i < results.length; i++) {
			const match = results[i].split(",");
			const matchNumber = match[0];
			const red = match.slice(1, 4).map((team) => teams[team]);
			const blue = match.slice(4, 7).map((team) => teams[team]);
			if (method === 1) {
				const exists = await Database.QualificationMatches.getByNumber({
					db: database,
					number: matchNumber,
				});
				if (exists.id) {
					continue;
				}
			}
			await Database.QualificationMatches.insert({
				db: database,
				number: matchNumber,
				redTeams: red,
				blueTeams: blue,
			});
		}
		alert("Done, if there's more, continue scanning");
		setResult("");
	};
	return (
		<div className="load">
			{result == "" ? (
				<div className="scanner">
					<h1>Schedule load</h1>
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

export default QualificationMatchesLoad;
