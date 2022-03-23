import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MatchInline from "../Components/Matches/MatchInline";
import CategoriesScout from "../Components/Categories/CategoriesScout";
import Database from "../Database";
import "../assets/scss/matchedit.scss";

const MatchEdit = ({ database }) => {
	let { teamId, matchId } = useParams();
	const [team, setTeam] = useState(null);
	const [match, setMatch] = useState(null);
	const navigate = useNavigate();

	teamId = parseInt(teamId);
	matchId = parseInt(matchId);
	useEffect(() => {
		const stuff = async () => {
			try {
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
			`Are you sure you want to delete match #${match.id}?`
		);
		if (!isAccepted) return;
		try {
			await Database.WaitingMatches.deleteByMatch({
				db: database,
				match_id: match.id,
			});
		} catch (error) {}

		await Database.Matches.delete({
			db: database,
			id: match.id,
		});
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
