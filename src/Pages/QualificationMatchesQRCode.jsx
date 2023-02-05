import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Database from "../Database";
import { Link } from "react-router-dom";
import qrcode from "qrcode";
import "../assets/scss/userQRCode.scss";
const objectToArray = ({ object = {} }) => {
	const keys = Object.keys(object);
	return keys.map((item) => object[item]);
};

function chunk(arr, len) {
	var chunks = [],
		i = 0,
		n = arr.length;

	while (i < n) {
		chunks.push(arr.slice(i, (i += len)));
	}

	return chunks;
}
const QualificationMatchesQRCode = ({ database }) => {
	const navigate = useNavigate();
	const [image, setImage] = useState("");
	const [currentChunk, setCurrentChunk] = useState(null);
	const [matches, setMatches] = useState([]);
	useEffect(() => {
		const stuff = async () => {
			try {
				const qualificationMatches =
					await Database.QualificationMatches.all({ db: database });
				const teams = await Database.Teams.all({ db: database });
				const teamsSimplified = {};
				for (let i = 0; i < teams.length; i++) {
					const team = teams[i];
					teamsSimplified[team.number] = i;
				}
				const matches = chunk(
					qualificationMatches.map(
						(match) =>
							`${match.number},${match.red
								.map((team) => teamsSimplified[team])
								.join(",")},${match.blue
								.map((team) => teamsSimplified[team])
								.join(",")}`
					),
					25
				);
				setMatches(matches);
				setCurrentChunk(0);
			} catch (error) {
				console.log(error);
			}
		};
		stuff();
	}, [database]);

	const nextChunk = async () => {
		if (currentChunk + 1 >= matches.length) {
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
			if (!matches.length) return;
			setImage(
				await qrcode.toDataURL(matches[currentChunk].join("|"), {
					width: 1000,
					height: 1000,
				})
			);
		};
		stuff();
	}, [currentChunk]);

	return (
		<div className="user-qrcode">
			<Link to="/qualification_matches" style={{ marginBottom: "10px" }}>
				Go back
			</Link>
			{matches.length > 1 && (
				<div>
					<button onClick={previousChunk}>Previous</button>
					<h1>
						#{currentChunk}/{matches.length - 1}
					</h1>
					<button onClick={nextChunk}>Next</button>
				</div>
			)}

			<img src={image} alt="" />
		</div>
	);
};

export default QualificationMatchesQRCode;
