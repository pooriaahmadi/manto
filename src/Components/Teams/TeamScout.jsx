import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Database from "../../Database";
import "../../assets/scss/teamscout.scss";

const TeamScout = ({ database }) => {
	const [team, setTeam] = useState(null);
	let { id } = useParams();
	id = parseInt(id);
	const navigate = useNavigate();
	useEffect(() => {
		const stuff = async () => {
			try {
				const team = await Database.Teams.getById({ db: database, id });
				if (!team) return navigate("/scout");
				setTeam(team);
			} catch (error) {
				console.log("Database is not ready yet");
			}
		};
		stuff();
	}, [database]);
	if (!team) {
		return <h1>loading...</h1>;
	}
	return (
		<div className="team-scout">
			<div className="top">
				<div className="avatar">
					<h1>{team.name[0].toUpperCase()}</h1>
				</div>
				<h1>{team.name}</h1>
			</div>
		</div>
	);
};
export default TeamScout;
