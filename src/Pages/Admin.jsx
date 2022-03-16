import TeamsInline from "../Components/Teams/TeamsInline";
import UsersInline from "../Components/Users/UsersInline";
import "../assets/scss/admin.scss";

const Admin = ({ database }) => {
	return (
		<div className="admin">
			<div className="teams">
				<TeamsInline database={database}></TeamsInline>
				<UsersInline database={database}></UsersInline>
			</div>
			<div className="users"></div>
		</div>
	);
};

export default Admin;
