import TeamsInline from "../Components/Teams/TeamsInline";
import "../assets/scss/scout.scss";
const Scout = ({ database }) => {
	return (
		<div className="scout">
			<TeamsInline scout database={database} />
		</div>
	);
};
export default Scout;
