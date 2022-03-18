import { useNavigate } from "react-router-dom";
import QrScanner from "qr-scanner";
import { QrReader } from "react-qr-reader";
import Database from "../Database";
import { useEffect } from "react";

const Home = ({ database }) => {
	const navigate = useNavigate();
	useEffect(() => {
		const stuff = async () => {
			try {
				const id = localStorage.getItem("user");
				if (!id) return;
				const user = await Database.Users.getById({
					db: database,
					id: parseInt(id),
				});
				if (!user) return;
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
