import { useState, useEffect } from "react";
import Database from "../../Database";

const PropertyScout = ({ database, matchId, id, title, type }) => {
	const [value, setValue] = useState(null);
	const defaultValues = ["default text", 0, false, 0];
	useEffect(() => {
		const stuff = async () => {
			const answer = await Database.Answers.getByProperty({
				db: database,
				property_id: id,
			});
			if (!answer) {
				await Database.insertAnswer({
					db: database,
					content: defaultValues[type],
					match_id: matchId,
					property_id: id,
				});
				setValue(defaultValues[type]);
				return;
			}
			setValue(answer.content);
		};
		stuff();
	}, []);
	return (
		<div className="property">
			<div className="left">
				{type === 3 ? title.split(",")[0] : title}
			</div>
			<div className="right">// TODO: CONTROLS</div>
		</div>
	);
};
export default PropertyScout;
