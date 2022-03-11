import HeaderItem from "./HeaderItem";
import close from "../../assets/images/close.png";
import "../../assets/scss/menu.scss";

const Menu = () => {
	return (
		<div className="menu">
			<div className="top">
				<h1>Manto</h1> <img src={close} alt="" />
			</div>
			<div className="bottom">
				<HeaderItem url="/" title="Home" />
			</div>
		</div>
	);
};
export default Menu;
