import HeaderItem from "./HeaderItem";
// import logo from "../../assets/images/logo.png";
import manto from "../../assets/images/manto.png";
import "../../assets/scss/header.scss";
import Menu from "./Menu";
import hamMenu from "../../assets/images/menu.png";
import { useState } from "react";
import { Link } from "react-router-dom";
const Header = ({ queue }) => {
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
					<img src={manto} alt="" />
					<div className="items">
						<HeaderItem url="/scout" title="Scout"></HeaderItem>
						<HeaderItem
							url="/qualification_matches"
							title="Schedule"
						></HeaderItem>
						<Link className="item queue" to="/queue">
							<div>
								Queue
								{queue !== 0 && <span>{queue}</span>}
							</div>
						</Link>
						<HeaderItem url="/admin" title="Admin"></HeaderItem>
						<HeaderItem
							url="/aboutus"
							title="About us"
						></HeaderItem>
					</div>
				</div>
				<div className="right">
					<img src={hamMenu} onClick={toggleActive} alt="" />
				</div>
			</header>
			<Menu
				active={active}
				toggleActive={toggleActive}
				queue={queue}
			></Menu>
		</>
	);
};
export default Header;
