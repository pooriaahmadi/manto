import "../../assets/scss/teaminline.scss";
import { Link } from "react-router-dom";
const UserInline = ({ username, name, id, handleDelete }) => {
	return (
		<div className="team-inline">
			<h2>{name}</h2>
			<div className="controls">
				<Link to={`/users/${id}/qrcode`}>QRCode</Link>
				<button onClick={handleDelete}>Delete</button>
			</div>
		</div>
	);
};
export default UserInline;
