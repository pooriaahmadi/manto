import "../../assets/scss/teaminline.scss";
import Database from "../../Database";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const TeamInline = ({ number, name, id, handleDelete }) => {
	return (
		<div className="team-inline">
			<h2>
				#{number} {name}
			</h2>
			<div className="controls">
				<Link to={`/teams/${id}/manage`}>Manage</Link>
				<Link to={`/teams/${id}/scout`}>Scout</Link>
				<button onClick={handleDelete}>Delete</button>
			</div>
		</div>
	);
};
export default TeamInline;
