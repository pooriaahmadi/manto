import { useEffect, useState } from "react";
import {
	BarChart,
	Bar,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import Database from "../Database";
import "../assets/scss/analytics.scss";

const Analytics = ({ database }) => {
	const [properties, setProperties] = useState([]);
	const [teams, setTeams] = useState([]);
	const [selected, setSelected] = useState([]);
	useEffect(() => {
		const stuff = async () => {
			try {
				const properties = await Database.Properties.all({
					db: database,
				});
				const teams = await Database.Teams.all({ db: database });
				setTeams(teams);
				setProperties(properties);
			} catch (error) {}
		};
		stuff();
	}, [database]);
	const generateData = () => {
		const output = [];
		teams.forEach((team) =>
			output.push({
				name: team.name,
			})
		);
		return output;
	};
	return (
		<div className="analytics">
			<div className="left">
				{properties.map((property) => {
					const handleClick = () => {
						if (
							selected.filter((item) => item === property.id)
								.length
						) {
							setSelected(
								selected.filter((item) => item !== property.id)
							);
						} else {
							setSelected([...selected, property.id]);
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
			<div
				className="right"
				style={{
					width: "100vw",
					height: "100vh",
					maxWidth: "100vw",
					overflowX: "scroll",
				}}
			>
				<ResponsiveContainer>
					<BarChart
						width={500}
						height={300}
						data={generateData()}
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="High goals" fill="#8884d8" />
						<Bar dataKey="Low goals" fill="#82ca9d" />
						<Bar dataKey="Climb" fill="#82ca9d" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default Analytics;
