import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Database from "../Database";

const MatchEdit = ({ database }) => {
	let { teamId, matchId } = useParams();
	const [team, setTeam] = useState(null);
	const [match, setMatch] = useState(null);
	const [categories, setCategories] = useState(null);
	const navigate = useNavigate();

	teamId = parseInt(teamId);
	matchId = parseInt(matchId);
	useEffect(() => {
		const stuff = async () => {
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
			const categories = await Database.Categories.all({ db: database });

			setCategories(categories);
			setTeam(team);
			setMatch(match);
		};
		try {
			stuff();
		} catch (error) {}
	}, [database]);
	return <div className="match-edit"></div>;
};
export default MatchEdit;
