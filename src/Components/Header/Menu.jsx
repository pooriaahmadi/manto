import HeaderItem from "./HeaderItem";
import close from "../../assets/images/close.png";
import "../../assets/scss/menu.scss";

const Menu = ({ active, toggleActive }) => {
	return (
		<div className={`menu` + (active ? " active" : "")}>
			<div className="top">
				<h1>Manto</h1> <img src={close} onClick={toggleActive} alt="" />
			</div>
			<div className="bottom" onClick={toggleActive}>
				<HeaderItem url="/" title="Home" />
				<HeaderItem url="/scout" title="Scout"></HeaderItem>
				<HeaderItem url="/admin" title="Admin" />
			</div>
		</div>
	);
};
export default Menu;
