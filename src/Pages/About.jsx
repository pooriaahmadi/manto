import "../assets/scss/aboutus.scss";
import pooria from "../assets/images/pooria.jpeg";
import cuteTeam3161 from "../assets/images/cuteteam3161.svg";
const About = () => {
	return (
		<div className="aboutus">
			<div className="history">
				<h1>History</h1>
				<p>
					Apps such as Facebook, TikTok, and Instagram gained
					popularity not due to fulfilling community needs, but rather
					by creating a demand and scarcity among the public. The same
					was true for scouting in sports; scouting was performed
					using paper or tools like Excel or Google Forms, lacking a
					dedicated platform. My idea was to revolutionize this
					process by developing a specialized app that would
					streamline the scouting process for scouts.
				</p>
			</div>
			<div className="developers">
				<h1>Developers</h1>
				<div className="people">
					<div className="person">
						<img src={pooria} alt="" />
						<h1>Pooria Ahmadi</h1>
						<p className="role">Founder</p>
						<div className="links">
							<a href="https://github.com/pooriaahmadi/">
								GitHub
							</a>
							<a href="https://www.instagram.com/pooriaahmadi444/">
								Instagram
							</a>
						</div>
					</div>
				</div>
			</div>
			<div className="developers">
				<h1>Sponsors</h1>
				<div className="people">
					<div className="person">
						<img src={cuteTeam3161} alt="" />
						<h1>Tronic Titans</h1>
						<p className="role gold">Gold sponsor</p>
						<div className="links">
							<a href="https://github.com/frc3161/">GitHub</a>
							<a href="https://team3161.ca/">Website</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
