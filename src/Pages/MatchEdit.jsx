import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MatchInline from "../Components/Matches/MatchInline";
import CategoriesScout from "../Components/Categories/CategoriesScout";
import Database from "../Database";
import "../assets/scss/matchedit.scss";

const MatchEdit = ({ database, decreaseQueue }) => {
	let { teamId, matchId } = useParams();
	const [team, setTeam] = useState(null);
	const [match, setMatch] = useState(null);
	const navigate = useNavigate();

	teamId = parseInt(teamId);
	matchId = parseInt(matchId);
	useEffect(() => {
		const stuff = async () => {
			try {
				const userID = parseInt(localStorage.getItem("user"));
				const user = await Database.Users.getById({
					db: database,
					id: userID,
				});
				if (!user) {
					navigate("/");
				}
				const team = await Database.Teams.getById({
					db: database,
					id: teamId,
				});
				if (!team) return navigate("/scout");
				const match = await Database.Matches.getById({
					db: database,
					id: matchId,
				});
				if (!match) return navigate(`/teams/${teamId}/scout`);
				setTeam(team);
				setMatch(match);
			} catch (error) {}
		};
		stuff();
	}, [database]);
	const handleDelete = async () => {
		const isAccepted = window.confirm(
			`Are you sure you want to delete match #${match.number}?`
		);
		if (!isAccepted) return;
		try {
			await Database.WaitingMatches.deleteByMatch({
				db: database,
				match_id: matchId,
			});
		} catch (error) {}
		const answers = await Database.Answers.getByMatch({
			db: database,
			match_id: matchId,
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
			id: matchId,
		});
		decreaseQueue();
		navigate(`/teams/${teamId}/scout`);
	};
	return (
		<div className="match-edit">
			<MatchInline handleDelete={handleDelete} {...match} id={matchId} />
			<CategoriesScout database={database} matchId={matchId} />
		</div>
	);
};
export default MatchEdit;
