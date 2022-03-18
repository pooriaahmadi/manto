import "../../assets/scss/teaminline.scss";
const PropertyInline = ({ id, title, type, handleDelete }) => {
	return (
		<div className="team-inline">
			<h3>{title}</h3>
			<div className="controls">
				<button onClick={handleDelete}>Delete</button>
			</div>
		</div>
	);
};
export default PropertyInline;
