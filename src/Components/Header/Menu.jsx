import HeaderItem from "./HeaderItem";
import close from "../../assets/images/close.png";
import "../../assets/scss/menu.scss";
import { Link } from "react-router-dom";

const Menu = ({ active, toggleActive, waitingNumber }) => {
	return (
		<div className={`menu` + (active ? " active" : "")}>
			<div className="top">
				<h1>Manto</h1> <img src={close} onClick={toggleActive} alt="" />
			</div>
			<div className="bottom" onClick={toggleActive}>
				<HeaderItem url="/" title="Home" />
				<HeaderItem url="/scout" title="Scout" />
				<HeaderItem
					url="/qualification_matches"
					title="Matches"
				></HeaderItem>
				<Link className="item queue" to="/queue">
					<div>
						Queue
						{waitingNumber !== 0 && <span>{waitingNumber}</span>}
					</div>
				</Link>
				<HeaderItem url="/admin" title="Admin" />
				<HeaderItem url="/update" title="Update" />
			</div>
		</div>
	);
};
export default Menu;
