import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from "chart.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import "../../assets/scss/analytics.scss";
import Database from "../../Database";
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
);
const randomRGB = () => (Math.random() * 256) >> 0;

const Comparison = ({ database, teamId }) => {
	const [team, setTeam] = useState(null);
	const [matches, setMatches] = useState([]);
	const [answers, setAnswers] = useState([]);
	const [properties, setProperties] = useState([]);
	const [selected, setSelected] = useState([]);
	const [colors, setColors] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		const stuff = async () => {
			try {
				const team = await Database.Teams.getById({
					db: database,
					id: teamId,
				});
				if (!team) return navigate("/scout");
				const matches = await Database.Matches.getByTeam({
					db: database,
					team_id: teamId,
				});
				const properties = await Database.Properties.all({
					db: database,
				});
				setColors(
					properties.map(
						(item) =>
							`rgba(${randomRGB()},${randomRGB()},${randomRGB()})`
					)
				);
				const answers = await Database.Answers.all({ db: database });
				setAnswers(answers);
				setProperties(properties);
				setTeam(team);
				setMatches(matches);
			} catch (error) {
				console.log("Database is not ready yet, waiting...");
			}
		};
		stuff();
	}, [database]);
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "Match Comparison",
			},
		},
	};
	const data = {
		labels: matches.map((match) => `Match #${match.number}`),
		datasets: selected.map((select) => {
			const property = properties[select];
			return {
				label: property.title.split("|")[0],
				backgroundColor: colors[select],
				borderColor: colors[select],
				fill: true,
				data: matches.map((match) => {
					const answer = answers.filter(
						(answer) =>
							answer.match === match.id &&
							answer.property === property.id
					)[0];
					return +answer.content;
				}),
			};
		}),
	};
	return (
		<>
			<div className="analytics comparison">
				<h1>Comparison</h1>
				<div className="average">
					<div className="left">
						{properties.map((property, index) => {
							const isActive = selected[selected.indexOf(index)];
							const handleClick = () => {
								if (isActive == undefined) {
									setSelected([...selected, index]);
								} else {
									setSelected(
										selected.filter(
											(item) => item !== index
										)
									);
								}
							};
							return (
								<div
									key={property.id}
									className={`property ${
										isActive !== undefined && "active"
									}`}
									onClick={handleClick}
								>
									<h1>
										{property.type === 3
											? property.title.split("|")[0]
											: property.title}
									</h1>
								</div>
							);
						})}
					</div>
					<div className="right">
						<Line options={options} data={data} />
					</div>
				</div>
			</div>
			<div className="stats">
				<div className="maximum">
					<div className="top">
						<h1>Maximum</h1>
					</div>
					<div className="bottom">
						{properties.map((property) => {
							const customAnswers = answers.filter(
								(answer) => answer.property === property.id
							);
							return (
								<div className="item" key={property.id}>
									<div className="left">
										<h4>{property.title.split("|")[0]}</h4>
									</div>
									<div className="right">
										<h3>
											{
												+customAnswers
													.sort(
														(a, b) =>
															+a.content -
															+b.content
													)
													.pop().content
											}
										</h3>
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className="minimum">
					<div className="top">
						<h1>Minimum</h1>
					</div>
					<div className="bottom">
						{properties.map((property) => {
							const customAnswers = answers.filter(
								(answer) => answer.property === property.id
							);
							return (
								<div className="item" key={property.id}>
									<div className="left">
										<h4>{property.title.split("|")[0]}</h4>
									</div>
									<div className="right">
										<h3>
											{
												+customAnswers.sort(
													(a, b) =>
														+a.content - +b.content
												)[0].content
											}
										</h3>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default Comparison;
