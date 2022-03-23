import "../../assets/scss/teaminline.scss";
const PropertyInline = ({
	id,
	title,
	type,
	handleDelete,
	scout = { scout },
}) => {
	const types = ["Text", "Number", "True/False", "Options"];
	return (
		<div className="team-inline">
			<h3>
				{type === 3 ? title.split("|")[0] : title} | {types[type]}
			</h3>
			<div className="controls">
				{!scout && <button onClick={handleDelete}>Delete</button>}
			</div>
		</div>
	);
};
export default PropertyInline;
