import "../assets/scss/aboutus.scss";
import pooria from "../assets/images/pooria.jpeg";
import cuteTeam3161 from "../assets/images/cuteteam3161.svg";
const About = () => {
	return (
		<div className="aboutus">
			<div className="history">
				<h1>History</h1>
				<p>
					Apps like Facebook, TikTok and Instagram didn't get popular
					because of community's needs. They produced a demand and a
					scarcity among the populace.
				</p>
				<p>
					The same thing happened with Manto; scouting was done on
					paper or using tools like Excel or Google Forms, and no one
					wanted to develop something special for it. However,{" "}
					<a href="https://team3161.ca">We</a> had the notion to turn
					this method into an app to make it easier for scouters to
					scout.
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
