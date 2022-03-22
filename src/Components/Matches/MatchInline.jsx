import "../../assets/scss/teaminline.scss";
import { Link } from "react-router-dom";
const MatchInline = ({ id, handleDelete, team, user }) => {
	return (
		<div className="team-inline">
			<h3>Match #{id}</h3>
			<div className="controls">
				<Link className="new" to={`/teams/${team}/matches/${id}/edit`}>
					Edit
				</Link>
				<button onClick={handleDelete}>Delete</button>
			</div>
		</div>
	);
};
export default MatchInline;
