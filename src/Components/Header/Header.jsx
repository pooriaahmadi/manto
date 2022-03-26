import HeaderItem from "./HeaderItem";
import logo from "../../assets/images/logo.png";
import "../../assets/scss/header.scss";
import Menu from "./Menu";
import hamMenu from "../../assets/images/menu.png";
import { useEffect, useState } from "react";
import Database from "../../Database";
import { Link } from "react-router-dom";
const Header = ({ database }) => {
	const [active, setActive] = useState(false);
	const [waitingNumber, setWaitingNumber] = useState(0);
	useEffect(() => {
		const stuff = async () => {
			try {
				const waitingMatches = await Database.WaitingMatches.all({
					db: database,
				});
				setWaitingNumber(waitingMatches.length);
			} catch (error) {}
		};
		stuff();
	}, [database]);
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
						<HeaderItem
							url="/qualification_matches"
							title="Matches"
						></HeaderItem>
						<Link className="item queue" to="/queue">
							<div>
								Queue
								{waitingNumber !== 0 && (
									<span>{waitingNumber}</span>
								)}
							</div>
						</Link>
						<HeaderItem url="/admin" title="Admin"></HeaderItem>
						<HeaderItem url="/update" title="Update"></HeaderItem>
					</div>
				</div>
				<div className="right">
					<img src={logo} alt="" />
					<img src={hamMenu} onClick={toggleActive} alt="" />
				</div>
			</header>
			<Menu
				active={active}
				toggleActive={toggleActive}
				waitingNumber={waitingNumber}
			></Menu>
		</>
	);
};
export default Header;
