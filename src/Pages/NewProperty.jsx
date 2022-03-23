import ErrorElement from "../Components/Error/ErrorElement";
import Database from "../Database";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/scss/inputs.scss";
import "../assets/scss/newteam.scss";

const NewProperty = ({ database }) => {
	const { id } = useParams();
	const [category, setCategory] = useState({ title: "Loading..." });
	const [type, setType] = useState(0);
	const [title, setTitle] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	useEffect(() => {
		const stuff = async () => {
			try {
				const category = await Database.Categories.getById({
					db: database,
					id: parseInt(id),
				});
				if (!category) return navigate("/admin");
				setCategory(category);
			} catch (error) {
				console.log("Database is not ready yet");
			}
		};
		stuff();
	}, [database]);
	const handleFormSubmit = async (e) => {
		e.preventDefault();
		if (title == "") {
			setError("Type or title is empty");
			return;
		}
		await Database.insertProperty({
			db: database,
			category_id: parseInt(id),
			title: title,
			type: type,
		});
		setError("");
		navigate("/admin");
	};
	const handleTypeChange = (e) => {
		setType(parseInt(e.target.value));
	};
	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};

	return (
		<div className="new-team">
			<form onSubmit={handleFormSubmit}>
				<h1>New Property</h1>
				{error && <ErrorElement content={error} />}
				<div
					className={
						"input" +
						(error.toLowerCase().includes("title") ? " error" : "")
					}
				>
					<h2>Title</h2>
					<input
						type="text"
						value={title}
						onChange={handleTitleChange}
						placeholder="Low goals scored"
					/>
				</div>
				<div
					className={
						"input" +
						(error.toLowerCase().includes("title") ? " error" : "")
					}
				>
					<h2>Type</h2>
					<select value={type} onChange={handleTypeChange}>
						<option value="0">Text</option>
						<option value="1">Number</option>
						<option value="2">True/False</option>
						<option value="3">Options</option>
					</select>
				</div>

				<div className="input">
					<h2>Category</h2>
					<input
						type="text"
						value={category.title}
						placeholder="Loading..."
						disabled
					/>
				</div>
				<input type="submit" value="Create" />
			</form>
		</div>
	);
};

export default NewProperty;
