import ErrorElement from "../Components/Error/ErrorElement";
import Database from "../Database";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/scss/inputs.scss";
import "../assets/scss/newteam.scss";
const NewCategory = ({ database }) => {
	const [title, setTitle] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const handleFormSubmit = async (e) => {
		e.preventDefault();
		if (title == "") {
			setError("title is empty");
			return;
		}
		try {
			await Database.insertCategory({
				db: database,
				title: title,
			});
		} catch (error) {
			setError("title is already in use");
			return;
		}
		setError("");
		navigate("/admin");
	};
	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};

	return (
		<div className="new-team">
			<form onSubmit={handleFormSubmit}>
				<h1>New Category</h1>
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
						placeholder="Auto"
					/>
				</div>
				<input type="submit" value="Create" />
			</form>
		</div>
	);
};

export default NewCategory;
