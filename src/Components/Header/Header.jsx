import HeaderItem from "./HeaderItem";
import logo from "../../assets/images/logo.png";
import "../../assets/scss/header.scss";
import Menu from "./Menu";
import hamMenu from "../../assets/images/menu.png";
import { useState } from "react";
const Header = () => {
	const [active, setActive] = useState(false);
	const toggleActive = () => {
		if (active) {
			setActive(false);
		} else {
			setActive(true);
		}
	};
	return (
		<>
			<header>
				<div className="left">
					<h1>Manto</h1>
					<div className="items">
						<HeaderItem url="/" title="Home"></HeaderItem>
						<HeaderItem url="/scout" title="Scout"></HeaderItem>
						<HeaderItem url="/admin" title="Admin"></HeaderItem>
					</div>
				</div>
				<div className="right">
					<img src={logo} alt="" />
					<img src={hamMenu} onClick={toggleActive} alt="" />
				</div>
			</header>
			<Menu active={active} toggleActive={toggleActive}></Menu>
		</>
	);
};
export default Header;
