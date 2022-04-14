import { useNavigate } from "react-router-dom";
import QrScanner from "qr-scanner";
import { QrReader } from "react-qr-reader";
import Database from "../Database";
import { useEffect } from "react";
import { useState } from "react";
const chunkArrayInGroups = (arr, size) => {
	var myArray = [];
	for (var i = 0; i < arr.length; i += size) {
		myArray.push(arr.slice(i, i + size));
	}
	return myArray;
};
const Home = ({ database }) => {
	const navigate = useNavigate();
	const [isOk, setIsOk] = useState(false);
	useEffect(() => {
		const stuff = async () => {
			try {
				const id = localStorage.getItem("user");
				if (!id) {
					setIsOk(true);
					return;
				}
				const user = await Database.Users.getById({
					db: database,
					id: parseInt(id),
				});
				if (!user) {
					setIsOk(true);
					return;
				}
				navigate("/scout");
			} catch (error) {
				console.log("Database is not ready yet");
			}
		};
		stuff();
	}, [database]);
	const handleFileChange = (e) => {
		const image = new Image();
		image.src = URL.createObjectURL(e.target.files[0]);
		image.onload = async () => {
			const result = await QrScanner.scanImage(image);
			if (!result) return;
			handleOnResult(result);
		};
	};
	const handleScan = (result) => {
		if (!result) return;
		handleOnResult(result.text);
	};
	const handleOnResult = async (result) => {
		result = JSON.parse(result);
		// const qualificationMatchesSchema = [
		// 	"number",
		// 	"red1",
		// 	"red2",
		// 	"red3",
		// 	"blue1",
		// 	"blue2",
		// 	"blue3",
		// ];
		// let qualificationMatches = chunkArrayInGroups(
		// 	result.qualificationMatches.split(","),
		// 	qualificationMatchesSchema.length
		// ).map((item) => {
		// 	return {
		// 		number: parseInt(item[0]),
		// 		redTeams: [
		// 			parseInt(item[1]),
		// 			parseInt(item[2]),
		// 			parseInt(item[3]),
		// 		],
		// 		blueTeams: [
		// 			parseInt(item[4]),
		// 			parseInt(item[5]),
		// 			parseInt(item[6]),
		// 		],
		// 	};
		// });
		// await Database.QualificationMatches.clear({ db: database });
		// for (let i = 0; i < qualificationMatches.length; i++) {
		// 	const qualificationMatch = qualificationMatches[i];
		// 	try {
		// 		await Database.QualificationMatches.insert({
		// 			db: database,
		// 			blueTeams: qualificationMatch.blueTeams,
		// 			redTeams: qualificationMatch.redTeams,
		// 			number: qualificationMatch.number,
		// 		});
		// 	} catch (error) {
		// 		console.error(error);
		// 	}
		// }
		try {
			result = await Database.insertUser({
				db: database,
				username: result.username,
				name: result.name,
			});
			localStorage.setItem("user", result);
			navigate("/scout");
		} catch (error) {
			const user = await Database.Users.getByUsername({
				db: database,
				username: result.username,
			});
			localStorage.setItem("user", parseInt(user.id));
			navigate("/scout");
		}
	};
	if (!database) return <h1>Database is not ready yet.</h1>;
	if (!isOk) return <></>;
	return (
		<div className="load">
			<div className="scanner">
				<h1 style={{ textAlign: "center", marginBottom: "10px" }}>
					User identification
				</h1>
				<div className="controls">
					<input type="file" onChange={handleFileChange} id="file" />
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
		</div>
	);
};

export default Home;
