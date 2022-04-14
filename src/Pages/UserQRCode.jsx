import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Database from "../Database";
import qrcode from "qrcode";
import { Link } from "react-router-dom";
import "../assets/scss/userQRCode.scss";

const UserQRCode = ({ database }) => {
	let { id } = useParams();
	id = parseInt(id);
	const [user, setUser] = useState({});
	const [image, setImage] = useState("");
	const objectToArray = ({ object = {} }) => {
		const keys = Object.keys(object);
		return keys.map((item) => object[item]);
	};
	useEffect(() => {
		const stuff = async () => {
			try {
				const user = await Database.Users.getById({
					db: database,
					id: id,
				});
				setUser(user);
				// const qualificationMatches = (
				// 	await Database.QualificationMatches.all({ db: database })
				// ).map((item) => {
				// 	delete item.id;
				// 	return item;
				// });
				setImage(
					await qrcode.toDataURL(
						JSON.stringify({
							id: id,
							...user,
							// qualificationMatches: qualificationMatches
							// 	.map((item) =>
							// 		objectToArray({ object: item }).join(",")
							// 	)
							// 	.join(","),
						}),
						{ width: 1000, height: 1000 }
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

export default UserQRCode;
