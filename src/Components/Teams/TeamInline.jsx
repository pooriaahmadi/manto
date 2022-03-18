import "../../assets/scss/teaminline.scss";
import { Link } from "react-router-dom";
const TeamInline = ({ number, name, id, handleDelete, scout = false }) => {
	return (
		<div className="team-inline">
			<h3>
				#{number} {name}
			</h3>
			<div className="controls">
				<Link to={`/teams/${id}/scout`}>Scout</Link>
				{!scout && (
					<>
						<Link to={`/teams/${id}/manage`}>Manage</Link>
						<button onClick={handleDelete}>Delete</button>
					</>
				)}
			</div>
		</div>
	);
};
export default TeamInline;
