import "../../assets/scss/teaminline.scss";
const MatchInline = ({ id, handleDelete }) => {
	return (
		<div className="team-inline">
			<h3>Match #{id}</h3>
			<div className="controls">
				<button onClick={handleDelete}>Delete</button>
			</div>
		</div>
	);
};
export default MatchInline;
