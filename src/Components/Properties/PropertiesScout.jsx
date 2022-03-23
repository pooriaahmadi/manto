import { useState, useEffect } from "react";
import Database from "../../Database";
import PropertyScout from "./PropertyScout";

const PropertiesScout = ({ database, matchId, categoryId }) => {
	const [properties, setProperties] = useState([]);
	useEffect(() => {
		const stuff = async () => {
			const properties = await Database.Properties.getByCategory({
				db: database,
				category_id: categoryId,
			});
			setProperties(properties);
		};
		stuff();
	}, []);
	return (
		<div className="properties">
			{properties.map((item) => (
				<PropertyScout
					database={database}
					matchId={matchId}
					{...item}
					key={item.id}
				/>
			))}
		</div>
	);
};

export default PropertiesScout;
