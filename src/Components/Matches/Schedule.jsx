import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../assets/scss/upcomingmatches.scss";
import Database from "../../Database";

const Schedule = ({ database }) => {
	const [qualificationMatches, setQualificationMatches] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		const stuff = async () => {
			try {
				const qualificationMatches = (
					await Database.QualificationMatches.all({ db: database })
				).sort((a, b) => a.number - b.number);
				setQualificationMatches(qualificationMatches);
			} catch (error) {
				console.error("Database is not connected, waiting...");
			}
		};
		stuff();
	}, [database]);
	const handleClick = async (teamId, matchNumber) => {
		const userId = parseInt(localStorage.getItem("user"));
		const matches = (
			await Database.Matches.getByTeam({
				db: database,
				team_id: teamId,
			})
		).filter((item) => item.number === matchNumber);
		if (!matches.length) {
			const match = await Database.insertMatch({
				db: database,
				number: matchNumber,
				team_id: teamId,
				user_id: userId,
			});
			await Database.WaitingMatches.insert({
				db: database,
				match_id: match,
			});
			increaseQueue();
			navigate(`/teams/${teamId}/matches/${match}/edit`);
		} else {
			const match = matches[0].id;
			navigate(`/teams/${teamId}/matches/${match}/edit`);
		}
	};
	return (
		<div className="teams-inline upcoming-matches">
			<div className="top">
				<h1>Upcoming Matches</h1>
				<div className="controls"></div>
			</div>
			<div className="bottom">
				{qualificationMatches.map((match) => {
					return (
						<div className="match">
							<div className="top">
								<h2>Match #{match.number}</h2>
							</div>
							<div className="bottom">
								<div className="left">
									{match.blue.map((team) => (
										<button to="">
											<h3>{team}</h3>
										</button>
									))}
								</div>
								<div className="right">
									{match.red.map((team) => (
										<button
											onClick={() => {
												handleClick(team, match.number);
											}}
										>
											<h3>{team}</h3>
										</button>
									))}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Schedule;
