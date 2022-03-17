import QrReader from "modern-react-qr-reader";
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
const CategoriesLoad = ({ database }) => {
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
		setResult(result);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const categorySchema = ["id", "title"];
		let categories = chunkArrayInGroups(
			result.split(","),
			categorySchema.length
		).map((item) => {
			return {
				id: parseInt(item[0]),
				title: item[1],
			};
		});
		if (method === 0) {
			await Database.Categories.clear({ db: database });
		} else if (method === 1) {
			const oldCategories = await Database.Categories.all({
				db: database,
			});
			categories = oldCategories
				.filter((x) => !categories.includes(x))
				.concat(categories.filter((x) => !oldCategories.includes(x)));
		}
		for (let i = 0; i < categories.length; i++) {
			const category = categories[i];
			try {
				await Database.insertCategory({
					db: database,
					title: category.title,
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
						onScan={handleScan}
						onError={handleError}
						facingMode="environment"
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

export default CategoriesLoad;
