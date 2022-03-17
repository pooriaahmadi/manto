import { useState, useEffect } from "react";
import Database from "../Database";
import qrcode from "qrcode";
import "../assets/scss/userQRCode.scss";

const CategoriesQRCode = ({ database }) => {
	const [categories, setCategories] = useState([]);
	const [image, setImage] = useState("");
	const objectToArray = ({ object = {} }) => {
		const keys = Object.keys(object);
		return keys.map((item) => object[item]);
	};
	useEffect(() => {
		const stuff = async () => {
			try {
				const categories = await Database.Categories.all({
					db: database,
				});
				setImage(
					await qrcode.toDataURL(
						categories
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

export default CategoriesQRCode;
