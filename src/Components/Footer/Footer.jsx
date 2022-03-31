import manto from "../../assets/images/manto.png";
import team3161 from "../../assets/images/team3161.svg";
import close from "../../assets/images/close.png";
import "../../assets/scss/footer.scss";
import { Link } from "react-router-dom";
const Footer = () => {
	return (
		<footer>
			<div className="top">
				<div className="left">
					<img src={manto} alt="" />
					<img src={close} className="close" alt="" />
					<img src={team3161} alt="" />
				</div>
				<div className="right">
					<Link to="/aboutus">About us</Link>
				</div>
			</div>
			<div className="bottom">
				<p>
					Copyright 2022 <span>Team 3161</span>, Made with lots of ☕
					and ❤️ by
					<a href="https://github.com/pooriaahmadi">Pooria Ahmadi</a>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
