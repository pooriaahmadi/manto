import "../../assets/scss/teaminline.scss";
import { Link } from "react-router-dom";
const UserInline = ({ username, name, id, handleDelete }) => {
	const use = () => {
		localStorage.setItem("user", id);
		alert("done");
	};
	return (
		<div className="team-inline">
			<h3>{name}</h3>
			<div className="controls">
				<Link to={`/users/${id}/qrcode`}>QRCode</Link>
				<button onClick={handleDelete}>Delete</button>
				<button onClick={use}>Use</button>
			</div>
		</div>
	);
};
export default UserInline;
