import "../../assets/scss/teaminline.scss";
const CategoryInline = ({ id, title, handleDelete }) => {
	return (
		<div className="team-inline">
			<h3>{title}</h3>
			<div className="controls">
				<button onClick={handleDelete}>Delete</button>
			</div>
		</div>
	);
};
export default CategoryInline;
