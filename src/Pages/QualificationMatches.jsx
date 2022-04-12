import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Database from "../Database";
import "../assets/scss/qualificationmatches.scss";

const QualificationMatches = ({ database, increaseQueue }) => {
	const [matches, setMatches] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		const stuff = async () => {
			try {
				const userID = parseInt(localStorage.getItem("user"));
				const user = await Database.Users.getById({
					db: database,
					id: userID,
				});
				if (!user) return navigate("/");
				const matches = await Database.QualificationMatches.all({
					db: database,
				});
				const teams = await Database.Teams.all({ db: database });
				if (!teams.length) return navigate("/teams/qrcode/load/scout");
				setMatches(
					matches
						.map((item) => {
							return {
								id: item.id,
								number: item.number,
								red: item.red.map(
									(team) =>
										teams.filter(
											(item) => item.number === team
										)[0]
								),
								blue: item.blue.map(
									(team) =>
										teams.filter(
											(item) => item.number === team
										)[0]
								),
							};
						})
						.sort((a, b) => a.number - b.number)
				);
			} catch (error) {}
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
	const handleOnLoad = () => {
		localStorage.removeItem("user");
		navigate("/");
	};
	return (
		<div className="teams-inline qualification-matches">
			<div className="top">
				<h1>Matches</h1>
				<div className="controls">
					<button className="qrcode" onClick={handleOnLoad}>
						Load
					</button>
				</div>
			</div>
			<div className="bottom">
				{matches.map((match) => {
					return (
						<div key={match.number} className="teams-inline">
							<div className="top">
								<h1>Match #{match.number}</h1>
								<div className="controls"></div>
							</div>
							<div className="bottom">
								<div className="left">
									{match.red.map((item) => {
										const click = () => {
											handleClick(item.id, match.number);
										};
										return (
											<div key={item.id} onClick={click}>
												<h3>{item.number}</h3>
											</div>
										);
									})}
								</div>
								<div className="right">
									{match.blue.map((item) => {
										const click = () => {
											handleClick(item.id, match.number);
										};
										return (
											<div key={item.id} onClick={click}>
												<h3>{item.number}</h3>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default QualificationMatches;
