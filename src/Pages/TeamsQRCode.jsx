import { useState, useEffect } from "react";
import Database from "../Database";
import qrcode from "qrcode";
import { Link } from "react-router-dom";
import "../assets/scss/userQRCode.scss";

function chunk(arr, len) {
	var chunks = [],
		i = 0,
		n = arr.length;

	while (i < n) {
		chunks.push(arr.slice(i, (i += len)));
	}

	return chunks;
}
const objectToArray = ({ object = {} }) => {
	const keys = Object.keys(object);
	return keys.map((item) => object[item]);
};
const TeamsQRCode = ({ database }) => {
	const [teams, setTeams] = useState([]);
	const [image, setImage] = useState("");
	const [currentChunk, setCurrentChunk] = useState(null);

	useEffect(() => {
		const stuff = async () => {
			try {
				let teams = await Database.Teams.all({ db: database });
				teams = chunk(teams, 30);
				setTeams(teams);
				setCurrentChunk(0);
			} catch (error) {}
		};
		stuff();
	}, [database]);

	const nextChunk = async () => {
		if (currentChunk + 1 >= teams.length) {
			alert("no more chunks available");
			return;
		}
		setCurrentChunk(currentChunk + 1);
	};

	const previousChunk = async () => {
		if (currentChunk - 1 < 0) {
			alert("you're at the beginning of chunks");
			return;
		}
		setCurrentChunk(currentChunk - 1);
	};

	useEffect(() => {
		const stuff = async () => {
			if (!teams.length) return;
			setImage(
				await qrcode.toDataURL(
					teams[currentChunk]
						.map((item) =>
							objectToArray({ object: item }).join(",")
						)
						.join(","),
					{
						width: 1000,
						height: 1000,
					}
				)
			);
			console.log("image changed");
		};
		stuff();
	}, [currentChunk]);
	return (
		<div className="user-qrcode">
			<Link to="/admin">Go back</Link>
			{teams.length > 1 && (
				<div>
					<button onClick={previousChunk}>Previous</button>
					<h1>
						#{currentChunk}/{teams.length - 1}
					</h1>
					<button onClick={nextChunk}>Next</button>
				</div>
			)}
			<img src={image} alt="" />
		</div>
	);
};

export default TeamsQRCode;
