import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Database from "../../Database";
import QueueInline from "./QueueInline";

const QueueList = ({ database, decreaseQueue }) => {
	const [queue, setQueue] = useState([]);
	const [selected, setSelected] = useState([]);
	useEffect(() => {
		const stuff = async () => {
			try {
				const queue = await Database.WaitingMatches.all({
					db: database,
				});
				let matches = await Database.Matches.all({ db: database });
				matches = matches.filter(
					(item) =>
						queue.filter((waiting) => item.id === waiting.match)
							.length
				);
				setQueue(matches);
			} catch (error) {}
		};
		stuff();
	}, [database]);
	return (
		<div className="teams-inline">
			<div className="top">
				<h1>Queue</h1>
				<div className="controls">
					<Link
						className="qrcode"
						to={`/queue/qrcode?matches=${selected.join(",")}`}
					>
						QRCode
					</Link>
				</div>
			</div>
			<div className="bottom">
				{queue.map((item) => {
					const onChange = (e) => {
						if (e.target.checked) {
							setSelected([...selected, item.id]);
						} else {
							setSelected(selected.filter((a) => a !== item.id));
						}
					};
					return (
						<QueueInline
							onChange={onChange}
							database={database}
							key={item.id}
							{...item}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default QueueList;
