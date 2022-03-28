import TeamsInline from "../Components/Teams/TeamsInline";
import UsersInline from "../Components/Users/UsersInline";
import CategoriesInline from "../Components/Categories/CategoriesInline";
import { Link } from "react-router-dom";
import "../assets/scss/admin.scss";

const Admin = ({ database }) => {
	return (
		<div className="admin">
			<div className="teams">
				<div className="actions">
					<Link className="action" to="/queue/load">
						Queue Load
					</Link>
					<Link className="action" to="/queue/load">
						Queue Load
					</Link>
					<Link className="action" to="/queue/load">
						Queue Load
					</Link>
					<Link className="action" to="/queue/load">
						Queue Load
					</Link>
				</div>
				<TeamsInline database={database}></TeamsInline>
				<UsersInline database={database}></UsersInline>
				<CategoriesInline database={database}></CategoriesInline>
			</div>
			<div className="users"></div>
		</div>
	);
};

export default Admin;
