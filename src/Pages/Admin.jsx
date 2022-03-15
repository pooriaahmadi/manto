import TeamsInline from "../Components/Teams/TeamsInline";
import "../assets/scss/admin.scss";

const Admin = ({ database }) => {
	return (
		<div className="admin">
			<div className="teams">
				<TeamsInline database={database}></TeamsInline>
			</div>
			<div className="users"></div>
		</div>
	);
};

export default Admin;
