import { useState, useEffect } from "react";
import Database from "../Database";
import qrcode from "qrcode";
import { Link } from "react-router-dom";
import "../assets/scss/userQRCode.scss";

const TransferSchedule = ({ database }) => {
	const [schedule, setSchedule] = useState([]);
	useEffect(() => {
		const stuff = async () => {
			try {
				const schedule = await Database.QualificationMatches.all({
					db: database,
				});
			} catch (error) {}
		};
		stuff();
	}, [database]);
};

export default TransferSchedule;
