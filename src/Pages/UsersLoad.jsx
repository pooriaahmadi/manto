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
const UsersLoad = ({ database }) => {
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
		const userSchema = ["id", "username", "name"];
		let users = chunkArrayInGroups(
			result.split(","),
			userSchema.length
		).map((item) => {
			return {
				id: parseInt(item[0]),
				username: item[1],
				name: item[2],
			};
		});

		if (method === 0) {
			await Database.Users.clear({ db: database });
		} else if (method === 1) {
			const oldUsers = await Database.Users.all({ db: database });
			users = oldUsers
				.filter((x) => !users.includes(x))
				.concat(users.filter((x) => !oldUsers.includes(x)));
		}
		for (let i = 0; i < users.length; i++) {
			const user = users[i];
			try {
				await Database.insertUser({
					db: database,
					username: user.username,
					name: user.name,
				});
			} catch (error) {
				console.error(error);
			}
		}

		navigate("/admin");
	};
	const handleError = (err) => {
		console.error(err);
	};
	return (
		<div className="load">
			{result === "" ? (
				<div className="scanner">
					<h1>Users Load</h1>
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

export default UsersLoad;
