import TeamsInline from "../Components/Teams/TeamsInline";
import CategoriesInline from "../Components/Categories/CategoriesInline";
import "../assets/scss/scout.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Database from "../Database";
const Scout = ({ database }) => {
	const navigate = useNavigate();
	useEffect(() => {
		const stuff = async () => {
			try {
				const id = localStorage.getItem("user");
				if (id) return;
				const user = await Database.Users.getById({
					db: database,
					id: parseInt(id),
				});
				if (user) return;
				navigate("/");
			} catch (error) {
				console.log("Database is not ready yet");
			}
		};
		stuff();
	}, [database]);
	return (
		<div className="scout">
			<TeamsInline scout database={database} />
			<CategoriesInline scout database={database} />
		</div>
	);
};
export default Scout;
