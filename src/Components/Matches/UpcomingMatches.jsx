import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../assets/scss/upcomingmatches.scss";
import Database from "../../Database";

const UpcomingMatches = ({ database, teamId }) => {
	const [qualificationMatches, setQualificationMatches] = useState([]);
	const [team, setTeam] = useState(null);
	const navigate = useNavigate();
	useEffect(() => {
		const stuff = async () => {
			try {
				const team = await Database.Teams.getById({
					db: database,
					id: teamId,
				});
				if (!team) return navigate("/scout");
				setTeam(team);
				let qualificationMatches =
					await Database.QualificationMatches.all({ db: database });
				qualificationMatches = qualificationMatches
					.filter(
						(match) =>
							match.blue.includes(team.number) ||
							match.red.includes(team.number)
					)
					.sort((a, b) => a.number - b.number);
				setQualificationMatches(qualificationMatches);
			} catch (error) {
				console.error("Database is not connected, waiting...");
			}
		};
		stuff();
	}, [database]);
	return (
		<div className="teams-inline upcoming-matches">
			<div className="top">
				<h1>Upcoming Matches</h1>
				<div className="controls"></div>
			</div>
			<div className="bottom">
				{qualificationMatches.map((match) => {
					return (
						<div key={match.id} className="match">
							<div className="top">
								<h2>Match #{match.number}</h2>
							</div>
							<div className="bottom">
								<div className="left">
									{match.blue.map((team) => (
										<Link key={team} to="">
											<h3>{team}</h3>
										</Link>
									))}
								</div>
								<div className="right">
									{match.red.map((team) => (
										<Link key={team} to="">
											<h3>{team}</h3>
										</Link>
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

export default UpcomingMatches;
