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
	const fetchTeams = async () => {
		const eventCode = window.prompt("Please enter the event code", "");
		if (eventCode === "") return;
		const isConfirmed = window.confirm(
			"This action will reset scouters data and teams, are you sure?"
		);
		if (!isConfirmed) return;
		const response = await fetch(
			`https://www.thebluealliance.com/api/v3/event/${eventCode}/teams/simple`,
			{
				headers: {
					"X-TBA-Auth-Key":
						"K5GkJ51zIXG6BvaO517zlQy4trUwo1la2Rvhx1vZfeXGsPHRm5UPbZcdTFFOuO43",
				},
			}
		);
		const data = await response.json();
		await Database.Answers.clear({ db: database });
		await Database.Teams.clear({ db: database });
		await Database.WaitingMatches.clear({ db: database });
		await Database.QualificationMatches.clear({ db: database });
		const qualificationMatchesResponse = await fetch(
			`https://www.thebluealliance.com/api/v3/event/${eventCode}/matches/simple`,
			{
				headers: {
					"X-TBA-Auth-Key":
						"K5GkJ51zIXG6BvaO517zlQy4trUwo1la2Rvhx1vZfeXGsPHRm5UPbZcdTFFOuO43",
				},
			}
		);
		const qualificationMatches = (
			await qualificationMatchesResponse.json()
		).filter((item) => item.comp_level == "qm");
		for (let i = 0; i < data.length; i++) {
			const team = data[i];
			const id = await Database.insertTeam({
				db: database,
				name: team.nickname,
				number: team.team_number,
			});
		}
		const teams = await Database.Teams.all({ db: database });

		for (let i = 0; i < qualificationMatches.length; i++) {
			const qualificationMatch = qualificationMatches[i];
			await Database.QualificationMatches.insert({
				db: database,
				number: qualificationMatch.match_number,
				blueTeams: qualificationMatch.alliances.blue.team_keys.map(
					(item) => parseInt(item.replace("frc", ""))
				),
				redTeams: qualificationMatch.alliances.red.team_keys.map(
					(item) => parseInt(item.replace("frc", ""))
				),
			});
		}
		setTeams(teams);
	};
	return (
		<div className="teams-inline">
			<div className="top">
				<h1>Teams</h1>
				<div className="controls">
					<Link
						className="qrcode"
						to={
							scout
								? "/teams/qrcode/load/scout"
								: "/teams/qrcode/load"
						}
					>
						Load
					</Link>
					{!scout && (
						<>
							<Link className="qrcode" to="/teams/qrcode">
								QRCode
							</Link>
							<button
								onClick={fetchTeams}
								className="new"
								style={{ marginRight: "10px" }}
							>
								Fetch
							</button>
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
						/>
					);
				})}
			</div>
		</div>
	);
};

export default TeamsInline;
