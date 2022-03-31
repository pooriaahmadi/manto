import ErrorElement from "../Components/Error/ErrorElement";
import Database from "../Database";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/scss/inputs.scss";
import "../assets/scss/newteam.scss";
const NewTeam = ({ database }) => {
	const [username, setUsername] = useState("");
	const [name, setName] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const handleFormSubmit = async (e) => {
		e.preventDefault();
		if (username === "" || name === "") {
			setError("username or preferred name is empty");
			return;
		}
		try {
			await Database.insertUser({
				db: database,
				name: name,
				username: username,
			});
		} catch (error) {
			setError("Username is already in use");
			return;
		}
		setError("");
		navigate("/admin");
	};
	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};
	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	return (
		<div className="new-team">
			<form onSubmit={handleFormSubmit}>
				<h1>New User</h1>
				{error && <ErrorElement content={error} />}
				<div
					className={
						"input" +
						(error.toLowerCase().includes("username")
							? " error"
							: "")
					}
				>
					<h2>Username</h2>
					<input
						type="text"
						value={username}
						onChange={handleUsernameChange}
						placeholder="regular_pooria"
						pattern="^[A-Za-z][A-Za-z0-9_]{1,29}"
					/>
				</div>
				<div
					className={
						"input" +
						(error.toLowerCase().includes("preferred")
							? " error"
							: "")
					}
				>
					<h2>Preferred name</h2>
					<input
						type="text"
						value={name}
						onChange={handleNameChange}
						placeholder="Pooria ahmadi"
					/>
				</div>
				<input type="submit" value="Create" />
			</form>
		</div>
	);
};

export default NewTeam;
