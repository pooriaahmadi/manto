import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TeamInline from "./TeamInline";
import Database from "../../Database";
import "../../assets/scss/teamsinline.scss";

const TeamsInline = ({ database, scout = false }) => {
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
					{!scout && (
						<>
							<Link className="qrcode" to="/teams/qrcode">
								QRCode
							</Link>
							<Link className="qrcode" to="/teams/qrcode/load">
								Load
							</Link>

							<Link className="new" to="/teams/new">
								New
							</Link>
						</>
					)}
				</div>
			</div>
			<div className="bottom">
				{teams.map((item, index) => {
					const handleDelete = async () => {
						const isAccepted = window.confirm(
							`Are you sure you want to delete team, ${item.number} ${item.name}?`
						);
						if (!isAccepted) return;
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
							scout={scout}
						></TeamInline>
					);
				})}
			</div>
		</div>
	);
};

export default TeamsInline;
