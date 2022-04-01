import { useEffect, useState } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Database from "../Database";
import "../assets/scss/analytics.scss";
const randomRGB = () => (Math.random() * 256) >> 0;
const Analytics = ({ database }) => {
	const [properties, setProperties] = useState([]);
	const [teams, setTeams] = useState([]);
	const [answers, setAnswers] = useState([]);
	const [matches, setMatches] = useState([]);
	const [selected, setSelected] = useState([]);
	const [colors, setColors] = useState([]);
	ChartJS.register(
		CategoryScale,
		LinearScale,
		BarElement,
		Title,
		Tooltip,
		Legend
	);

	useEffect(() => {
		const stuff = async () => {
			try {
				const properties = await Database.Properties.all({
					db: database,
				});
				const teams = await Database.Teams.all({ db: database });
				const answers = await Database.Answers.all({ db: database });
				const matches = await Database.Matches.all({ db: database });
				setColors(
					teams.map(
						(item) =>
							`rgba(${randomRGB()}, ${randomRGB()}, ${randomRGB()}, 0.5)`
					)
				);
				setMatches(matches);
				setTeams(teams);
				setAnswers(answers);
				setProperties(properties);
			} catch (error) {}
		};
		stuff();
	}, [database]);

	const labels = selected.map((item) => properties[item].title.split("|")[0]);
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "Analytics",
			},
		},
	};
	const data = {
		labels,
		datasets: teams.map((team, index) => {
			return {
				label: team.name,
				data: selected.map((item) => {
					let sum = 0;
					const property = properties[item];
					const propertyAnswers = answers
						.filter((answer) => answer.property === property.id)
						.filter(
							(answer) =>
								matches.filter(
									(match) => match.id === answer.match
								)[0].team === team.id
						);
					propertyAnswers.forEach((item) => (sum += item.content));
					return sum / propertyAnswers.length;
				}),
				backgroundColor: colors[index],
			};
		}),
	};
	return (
		<div className="analytics">
			<div className="left">
				{properties.map((property, index) => {
					const handleClick = () => {
						if (selected[selected.indexOf(index)] == undefined) {
							setSelected([...selected, index]);
						} else {
							setSelected(
								selected.filter((item) => item !== index)
							);
						}
					};
					return (
						<div key={property.id} className="property">
							<input type="checkbox" onClick={handleClick} />
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
				<Bar options={options} data={data} />
			</div>
		</div>
	);
};

export default Analytics;
