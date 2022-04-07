import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Database from "../Database";
import { Link } from "react-router-dom";
import qrcode from "qrcode";
import "../assets/scss/userQRCode.scss";
const objectToArray = ({ object = {} }) => {
	const keys = Object.keys(object);
	return keys.map((item) => object[item]);
};
const QueueQRCode = ({ database, decreaseQueue }) => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const [image, setImage] = useState("");
	const ids = searchParams
		.get("matches")
		.split(",")
		.map((item) => parseInt(item));
	useEffect(() => {
		const stuff = async () => {
			try {
				let answers = [];
				for (let i = 0; i < ids.length; i++) {
					const id = ids[i];
					answers.push(
						await Database.Answers.getByMatch({
							db: database,
							match_id: id,
						})
					);
				}
				answers = answers.map((item) =>
					item.map((item) => {
						delete item.id;
						return item;
					})
				);
				const teams = await Database.Teams.all({ db: database });
				const matches = (await Database.Matches.all({ db: database }))
					.filter((item) => ids.filter((id) => item.id === id).length)
					.map((item) => {
						delete item.user;
						return {
							...item,
							team: teams.filter(
								(team) => team.id === item.team
							)[0].number,
						};
					});
				const properties = (
					await Database.Properties.all({
						db: database,
					})
				).map((item) => {
					delete item.type;
					delete item.category;
					return item;
				});
				const user = await Database.Users.getById({
					db: database,
					id: parseInt(localStorage.getItem("user")),
				});
				if (!user) {
					localStorage.removeItem("user");
					navigate("/");
				}
				setImage(
					await qrcode.toDataURL(
						JSON.stringify({
							properties: properties
								.map((item) =>
									objectToArray({ object: item }).join(",")
								)
								.join(","),
							matches: matches
								.map((item) =>
									objectToArray({ object: item }).join(",")
								)
								.join(","),
							answers: answers
								.map((item) =>
									item.map((item) =>
										objectToArray({ object: item }).join(
											","
										)
									)
								)
								.join(","),
							user: user.username,
						}),
						{ width: 1000, height: 1000 }
					)
				);
			} catch (error) {
				console.log(error);
			}
		};
		stuff();
	}, [database]);
	const onClick = async (e) => {
		e.preventDefault();
		for (let i = 0; i < ids.length; i++) {
			const id = ids[i];
			decreaseQueue();
			await Database.WaitingMatches.delete({ db: database, id });
		}
		navigate("/queue");
	};
	return (
		<div className="user-qrcode">
			<Link to="/queue" style={{ marginBottom: "10px" }}>
				Go back
			</Link>
			<Link to="/queue" onClick={onClick}>
				Done
			</Link>

			<img src={image} alt="" />
		</div>
	);
};

export default QueueQRCode;
