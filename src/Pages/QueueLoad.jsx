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
const QueueLoad = ({ database }) => {
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
			handleSubmit(result);
		};
	};
	const handleScan = (result) => {
		if (!result) return;
		setResult(result.text);
		handleSubmit(result.text);
	};
	const checkContent = (content) => {
		if (content === "true") {
			return true;
		} else if (content === "false") {
			return false;
		} else {
			return parseInt(content);
		}
	};
	const handleSubmit = async (result) => {
		try {
			result = JSON.parse(result);
			let properties = result.properties;
			let answers = result.answers;
			let matches = result.matches;
			const user = await Database.Users.getByUsername({
				db: database,
				username: result.user,
			});
			const propertySchema = ["id", "title"];
			properties = chunkArrayInGroups(
				properties.split(","),
				propertySchema.length
			).map((item) => {
				return {
					id: parseInt(item[0]),
					title: item[1],
				};
			});
			const mainDeivceProperties = await Database.Properties.all({
				db: database,
			});
			for (let i = 0; i < properties.length; i++) {
				properties[i] = {
					mainId: mainDeivceProperties.filter(
						(item) => item.title === properties[i].title
					)[0].id,
					id: properties[i].id,
				};
			}

			const teams = await Database.Teams.all({ db: database });
			const matchSchema = ["id", "team", "number"];
			matches = chunkArrayInGroups(
				matches.split(","),
				matchSchema.length
			).map((item) => {
				return {
					id: parseInt(item[0]),
					team: teams.filter(
						(team) => team.number === parseInt(item[1])
					)[0],
					number: parseInt(item[2]),
				};
			});
			const answerSchema = ["content", "property", "match"];
			answers = chunkArrayInGroups(
				chunkArrayInGroups(answers.split(","), answerSchema.length).map(
					(item) => {
						return {
							content: item[0],
							property: parseInt(item[1]),
							match: parseInt(item[2]),
						};
					}
				),
				properties.length
			);
			const tmpMatches = await Database.Matches.all({ db: database });
			for (let i = 0; i < matches.length; i++) {
				const match = matches[i];
				const dublicate = tmpMatches.filter(
					(tmpMatch) =>
						tmpMatch.team === match.team.id &&
						tmpMatch.number === match.number
				);
				if (dublicate.length) {
					console.log("dublicate");
					const batch = answers[i];
					for (let k = 0; k < batch.length; k++) {
						const answer = batch[k];
						await Database.Dublicates.insert({
							db: database,
							content: checkContent(answer.content),
							match_id: dublicate[0].id,
							property_id: properties.filter(
								(item) => item.id === answer.property
							)[0].mainId,
						});
					}
					return;
				}
				const newMatchId = await Database.insertMatch({
					db: database,
					number: match.number,
					user_id: user.id,
					team_id: match.team.id,
				});
				tmpMatches.push({
					team: match.team.id,
					number: match.number,
				});

				const batch = answers[i];
				for (let k = 0; k < batch.length; k++) {
					const answer = batch[k];
					await Database.insertAnswer({
						db: database,
						content: checkContent(answer.content),
						match_id: newMatchId,
						property_id: properties.filter(
							(item) => item.id === answer.property
						)[0].mainId,
					});
				}
			}
			navigate("/admin");
		} catch (error) {
			alert(`${error} | This might be because the devices are not sync.`);
		}
	};
	const handleError = (err) => {
		console.error(err);
	};
	return (
		<div className="load">
			{!result && (
				<div className="scanner">
					<h1>Queue load</h1>
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
			)}
		</div>
	);
};

export default QueueLoad;
