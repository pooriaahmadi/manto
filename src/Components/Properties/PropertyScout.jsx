import { useState, useEffect } from "react";
import Database from "../../Database";
import "../../assets/scss/inputs.scss";
import plusSvg from "../../assets/images/plus.svg";
import minusSvg from "../../assets/images/minus.svg";
const PropertyScout = ({ database, matchId, id, title, type }) => {
	const [value, setValue] = useState(null);
	const [answerId, setAnswerId] = useState(null);
	const defaultValues = ["default text", 0, false, 0];
	useEffect(() => {
		const stuff = async () => {
			const answer = await Database.Answers.getByMatchAndProperty({
				db: database,
				property_id: id,
				match_id: matchId,
			});
			if (!answer) {
				const answer = await Database.insertAnswer({
					db: database,
					content: defaultValues[type],
					match_id: matchId,
					property_id: id,
				});
				setValue(defaultValues[type]);
				setAnswerId(answer);
				return;
			}
			setAnswerId(answer.id);
			setValue(answer.content);
		};
		stuff();
	}, []);
	const handleValueChange = async (e) => {
		let tmp = null;
		if (type === 0) {
			setValue(e.target.value);
			tmp = e.target.value;
		} else if (type === 1) {
			if (!e.target.value || e.target.value === "") {
				setValue(0);
				return;
			}
			setValue(parseInt(e.target.value));
			tmp = parseInt(e.target.value);
		} else if (type === 2) {
			setValue(!value);
			tmp = !value;
		} else if (type === 3) {
			setValue(parseInt(e.target.value));
			tmp = parseInt(e.target.value);
		}
		await Database.Answers.update({
			db: database,
			id: answerId,
			data: { content: tmp },
		});
	};
	const increase = async () => {
		setValue(value + 1);
		await Database.Answers.update({
			db: database,
			id: answerId,
			data: { content: value + 1 },
		});
	};
	const decrease = async () => {
		setValue(value - 1);
		await Database.Answers.update({
			db: database,
			id: answerId,
			data: { content: value - 1 },
		});
	};
	const renderControls = () => {
		if (type === 0) {
			return (
				<input type="text" value={value} onChange={handleValueChange} />
			);
		} else if (type === 1) {
			return (
				<div className="number">
					<img onClick={increase} src={plusSvg} alt="" />
					<input
						type="number"
						value={value}
						onChange={handleValueChange}
					/>
					<img onClick={decrease} src={minusSvg} alt="" />
				</div>
			);
		} else if (type === 2) {
			return (
				<input
					type="checkbox"
					checked={value}
					onChange={handleValueChange}
				/>
			);
		} else if (type === 3) {
			const options = title.split("|");
			options.shift();
			return (
				<select value={value} onChange={handleValueChange}>
					{options.map((item, index) => (
						<option value={index} key={index}>
							{item}
						</option>
					))}
				</select>
			);
		}
		return <></>;
	};
	return (
		<div className="property">
			<div className="left">
				<h3>{type === 3 ? title.split("|")[0] : title}</h3>
			</div>
			<div className="right">{value !== null && renderControls()}</div>
		</div>
	);
};
export default PropertyScout;
