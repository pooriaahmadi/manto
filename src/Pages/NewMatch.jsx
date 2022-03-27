import ErrorElement from "../Components/Error/ErrorElement";
import Database from "../Database";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/scss/inputs.scss";
import "../assets/scss/newteam.scss";

const NewMatch = ({ database, increaseQueue }) => {
	let { teamId } = useParams();
	teamId = parseInt(teamId);
	const [number, setNumber] = useState(null);
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const handleFormSubmit = async (e) => {
		e.preventDefault();
		let match = undefined;
		if (!number) {
			setError("Number is empty");
			return;
		}
		try {
			match = await Database.insertMatch({
				db: database,
				number: number,
				team_id: teamId,
				user_id: parseInt(localStorage.getItem("user")),
			});
			await Database.WaitingMatches.insert({
				db: database,
				match_id: match,
			});
			increaseQueue();
		} catch (error) {
			setError("Number is already in use");
			return;
		}
		setError("");
		navigate(`/teams/${teamId}/matches/${match}/edit`);
	};
	const handleNumberChange = (e) => {
		if (e.target.value) {
			setNumber(parseInt(e.target.value));
		} else {
			setNumber(0);
		}
	};

	return (
		<div className="new-team">
			<form onSubmit={handleFormSubmit}>
				<h1>New Match</h1>
				{error && <ErrorElement content={error} />}
				<div
					className={
						"input" +
						(error.toLowerCase().includes("number") ? " error" : "")
					}
				>
					<h2>Match number</h2>
					<input
						type="number"
						value={number == 0 ? "" : number}
						onChange={handleNumberChange}
						placeholder="14"
					/>
				</div>

				<input type="submit" value="Create" />
			</form>
		</div>
	);
};

export default NewMatch;
