import "../../assets/scss/teaminline.scss";
import { Link } from "react-router-dom";
const TeamInline = ({ number, name, id, handleDelete }) => {
	return (
		<div className="team-inline">
			<h3>
				#{number} {name}
			</h3>
			<div className="controls">
				<Link to={`/teams/${id}/manage`}>Manage</Link>
				<Link to={`/teams/${id}/scout`}>Scout</Link>
				<button onClick={handleDelete}>Delete</button>
			</div>
		</div>
	);
};
export default TeamInline;
