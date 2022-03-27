import { useEffect, useState } from "react";
import Database from "../../Database";

const QueueInline = ({ onChange, database, id, team, user, number }) => {
	const [teamObject, setTeamObject] = useState(null);
	useEffect(() => {
		const stuff = async () => {
			const teamObject = await Database.Teams.getById({
				db: database,
				id: team,
			});
			setTeamObject(teamObject);
		};
		stuff();
	}, []);
	if (!teamObject) return <></>;
	return (
		<div className="team-inline">
			<h3>
				Match #{number} | {teamObject.number}
			</h3>
			<div className="controls">
				<input type="checkbox" onChange={onChange} />
			</div>
		</div>
	);
};

export default QueueInline;
