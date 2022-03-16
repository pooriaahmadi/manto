import ErrorElement from "../Components/Error/ErrorElement";
import Database from "../Database";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/scss/inputs.scss";
import "../assets/scss/newteam.scss";
const NewTeam = ({ database }) => {
	const [number, setNumber] = useState(0);
	const [name, setName] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const handleFormSubmit = async (e) => {
		e.preventDefault();
		if (number == 0 || name == "") {
			setError("Number or name is empty");
			return;
		}
		try {
			await Database.insertTeam({
				db: database,
				number: number,
				name: name,
			});
		} catch (error) {
			setError("Number is already in use");
			return;
		}
		setError("");
		navigate("/admin");
	};
	const handleNumberChange = (e) => {
		if (e.target.value) {
			setNumber(parseInt(e.target.value));
		} else {
			setNumber(0);
		}
	};
	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	return (
		<div className="new-team">
			<form onSubmit={handleFormSubmit}>
				<h1>New Team</h1>
				{error && <ErrorElement content={error} />}
				<div
					className={
						"input" +
						(error.toLowerCase().includes("number") ? " error" : "")
					}
				>
					<h2>Team number</h2>
					<input
						type="number"
						value={number == 0 ? "" : number}
						onChange={handleNumberChange}
						placeholder="3161"
					/>
				</div>
				<div
					className={
						"input" +
						(error.toLowerCase().includes("name") ? " error" : "")
					}
				>
					<h2>Team name</h2>
					<input
						type="text"
						value={name}
						onChange={handleNameChange}
						placeholder="Tronic Titans"
					/>
				</div>
				<input type="submit" value="Create" />
			</form>
		</div>
	);
};

export default NewTeam;
