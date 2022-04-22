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
	const [dublicates, setDublicates] = useState([]);
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
				const dublicates = await Database.Dublicates.all({
					db: database,
				});
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
				setDublicates(dublicates);
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
	const dataset = [];
	const maximumDataset = [];
	const minimumDataset = [];
	for (let i = 0; i < teams.length; i++) {
		const team = teams[i];
		const output = [];
		const outputMaximum = [];
		const outputMinimum = [];
		for (let k = 0; k < selected.length; k++) {
			const property = properties[selected[k]];
			const teamMatches = matches.filter(
				(match) => match.team === team.id
			);
			const matchAnswers = teamMatches.map((match) =>
				answers.filter((answer) => answer.match === match.id)
			);

			const dublicateMatchAnswers = teamMatches
				.map((match) =>
					dublicates.filter((answer) => answer.match === match.id)
				)
				.map((answers) =>
					answers.filter((answer) => answer.property === property.id)
				);

			const propertyAnswers = matchAnswers.map((answers) =>
				answers.filter((answer) => answer.property === property.id)
			);

			let outputSum = 0;
			let counter = 0;
			propertyAnswers.forEach((item) => {
				let sum = 0;
				item.forEach((item) => (sum += item.content));
				counter += item.length;
				outputSum += sum;
			});
			dublicateMatchAnswers.forEach((item) => {
				let sum = 0;
				item.forEach((item) => (sum += item.content));
				counter += item.length;
				outputSum += sum;
			});
			outputMaximum.push(
				Math.max(
					...propertyAnswers.map((item) =>
						item.map((item) => +item.content)
					)
				)
			);
			outputMinimum.push(
				Math.min(
					...propertyAnswers.map((item) =>
						item.map((item) => +item.content)
					)
				)
			);
			console.log(
				propertyAnswers.map((item) => item.map((item) => item.content))
			);
			output.push(outputSum / counter);
		}
		dataset.push({
			label: `${team.name} ${team.number}`,
			data: output,
			backgroundColor: colors[i],
		});
		maximumDataset.push({
			label: `${team.name} ${team.number}`,
			data: outputMaximum,
			backgroundColor: colors[i],
		});
		minimumDataset.push({
			label: `${team.name} ${team.number}`,
			data: outputMinimum,
			backgroundColor: colors[i],
		});
	}
	const data = {
		labels,
		datasets: dataset,
	};
	return (
		<div className="analytics">
			<h1>Average</h1>
			<div className="average">
				<div className="left">
					{properties.map((property, index) => {
						const isActive = selected[selected.indexOf(index)];
						const handleClick = () => {
							if (isActive == undefined) {
								setSelected([...selected, index]);
							} else {
								setSelected(
									selected.filter((item) => item !== index)
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
					<Bar options={options} data={data} />
				</div>
			</div>
			<h1>Maximum</h1>
			<div className="maximum">
				<Bar
					options={options}
					data={{
						labels,
						datasets: maximumDataset,
					}}
				/>
			</div>
			<h1>Minimum</h1>
			<div className="minimum">
				<Bar
					options={options}
					data={{
						labels,
						datasets: minimumDataset,
					}}
				/>
			</div>
		</div>
	);
};

export default Analytics;
