import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TeamInline from "./TeamInline";
import Database from "../../Database";
import "../../assets/scss/teamsinline.scss";
const TeamsInline = ({ database }) => {
	const [teams, setTeams] = useState([]);
	useEffect(() => {
		const stuff = async () => {
			try {
				const teams = await Database.Teams.all({ db: database });
				setTeams(teams);
			} catch (error) {
				console.log("Database is not connected yet.");
			}
		};
		stuff();
	}, [database]);
	return (
		<div className="teams-inline">
			<div className="top">
				<h1>Teams</h1>
				<div className="controls">
					<Link className="new" to="/teams/new">
						New
					</Link>
				</div>
			</div>
			<div className="bottom">
				{teams.map((item, index) => {
					const handleDelete = async () => {
						const isAccepted = window.confirm(
							`Are you sure you want to delete team, ${item.number} ${item.name}?`
						);
						if (!isAccepted) return;
						console.log(item);
						await Database.Teams.delete({
							db: database,
							id: item.id,
						});
						setTeams(teams.filter((newItem) => newItem !== item));
					};
					return (
						<TeamInline
							key={index}
							{...item}
							handleDelete={handleDelete}
						></TeamInline>
					);
				})}
			</div>
		</div>
	);
};

export default TeamsInline;
