import PropertiesScout from "../Properties/PropertiesScout";

const CategoryScout = ({ database, matchId, id, title }) => {
	return (
		<div className="category">
			<h2>{title}</h2>
			<PropertiesScout
				categoryId={id}
				database={database}
				matchId={matchId}
			/>
		</div>
	);
};

export default CategoryScout;
