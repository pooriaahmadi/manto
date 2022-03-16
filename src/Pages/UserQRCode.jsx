import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Database from "../Database";
import qrcode from "qrcode";
import "../assets/scss/userQRCode.scss";

const UserQRCode = ({ database }) => {
	let { id } = useParams();
	id = parseInt(id);
	const [user, setUser] = useState({});
	const [image, setImage] = useState("");
	useEffect(() => {
		const stuff = async () => {
			try {
				const user = await Database.Users.getById({
					db: database,
					id: id,
				});
				setUser(user);
				setImage(
					await qrcode.toDataURL(
						JSON.stringify({ id: id, ...user }),
						{ width: 1000, height: 1000 }
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

export default UserQRCode;
