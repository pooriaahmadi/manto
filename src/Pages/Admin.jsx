import TeamsInline from "../Components/Teams/TeamsInline";
import UsersInline from "../Components/Users/UsersInline";
import CategoriesInline from "../Components/Categories/CategoriesInline";
import "../assets/scss/admin.scss";

const Admin = ({ database }) => {
	return (
		<div className="admin">
			<div className="teams">
				<TeamsInline database={database}></TeamsInline>
				<UsersInline database={database}></UsersInline>
				<CategoriesInline database={database}></CategoriesInline>
			</div>
			<div className="users"></div>
		</div>
	);
};

export default Admin;
