import { useState, useEffect } from "react";
import Database from "../Database";
import qrcode from "qrcode";
import { Link } from "react-router-dom";
import "../assets/scss/userQRCode.scss";

const UsersQRCode = ({ database }) => {
	const [users, setUsers] = useState([]);
	const [image, setImage] = useState("");
	const objectToArray = ({ object = {} }) => {
		const keys = Object.keys(object);
		return keys.map((item) => object[item]);
	};
	useEffect(() => {
		const stuff = async () => {
			try {
				const users = await Database.Users.all({ db: database });
				setUsers(users);
				setImage(
					await qrcode.toDataURL(
						users
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
			<Link to="/admin">Go back</Link>

			<img src={image} alt="" />
		</div>
	);
};

export default UsersQRCode;
