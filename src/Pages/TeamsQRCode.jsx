import { useState, useEffect } from "react";
import Database from "../Database";
import qrcode from "qrcode";
import "../assets/scss/userQRCode.scss";

const TeamsQRCode = ({ database }) => {
	const [teams, setTeams] = useState([]);
	const [image, setImage] = useState("");
	const objectToArray = ({ object = {} }) => {
		const keys = Object.keys(object);
		return keys.map((item) => object[item]);
	};
	useEffect(() => {
		const stuff = async () => {
			try {
				const teams = await Database.Teams.all({ db: database });
				setImage(
					await qrcode.toDataURL(
						teams
							.map((item) =>
								objectToArray({ object: item }).join(",")
							)
							.join(","),
						{
							width: 1000,
							height: 1000,
						}
					)
				);
			} catch (error) {}
		};
		stuff();
	}, [database]);
	return (
		<div className="user-qrcode">
			<img src={image} alt="" />
		</div>
	);
};

export default TeamsQRCode;
