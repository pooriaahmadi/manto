import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Database from "../../Database";
import MatcheInline from "./MatchInline";
import "../../assets/scss/teamsinline.scss";
const MatchesInline = ({ database, team_id, increaseQueue, decreaseQueue }) => {
	const [matches, setMatches] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		const stuff = async () => {
			try {
				const matches = await Database.Matches.getByTeam({
					db: database,
					team_id,
				});
				setMatches(matches);
			} catch (error) {
				console.log("Database is not connected yet.");
			}
		};
		stuff();
	}, [database]);
	const newMatch = async () => {
		const user_id = parseInt(localStorage.getItem("user"));
		const match = await Database.insertMatch({
			db: database,
			team_id,
			user_id,
		});
		await Database.WaitingMatches.insert({
			db: database,
			match_id: match,
		});
		increaseQueue();
		setMatches([...matches, { id: match, team: team_id, user: user_id }]);
		navigate(`/teams/${team_id}/matches/${match}/edit`);
	};
	return (
		<div className="teams-inline">
			<div className="top">
				<h1>Matches</h1>
				<div className="controls">
					<Link
						className="qrcode"
						to={`/teams/${team_id}/matches/qrcode`}
					>
						QRCode
					</Link>
					<Link
						className="qrcode"
						to={`/teams/${team_id}/matches/qrcode/load`}
					>
						Load
					</Link>
					{/* <Link className="new" to={`/teams/${team_id}/matches/new`}>
						New
					</Link> */}
				</div>
			</div>
			<div className="bottom">
				{matches.map((item, index) => {
					const handleDelete = async () => {
						const isAccepted = window.confirm(
							`Are you sure you want to delete match #${item.id}?`
						);
						if (!isAccepted) return;
						await Database.WaitingMatches.deleteByMatch({
							db: database,
							match_id: item.id,
						});
						const answers = await Database.Answers.getByMatch({
							db: database,
							match_id: item.id,
						});
						for (let i = 0; i < answers.length; i++) {
							const answer = answers[i];
							await Database.Answers.delete({
								db: database,
								id: answer.id,
							});
						}
						await Database.Matches.delete({
							db: database,
							id: item.id,
						});
						decreaseQueue();
						setMatches(
							matches.filter((newItem) => newItem !== item)
						);
					};
					return (
						<MatcheInline
							key={index}
							{...item}
							handleDelete={handleDelete}
						></MatcheInline>
					);
				})}
			</div>
		</div>
	);
};

export default MatchesInline;
