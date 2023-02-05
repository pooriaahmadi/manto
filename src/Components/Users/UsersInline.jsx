import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Database from "../../Database";
import UserInline from "./UserInline";
import "../../assets/scss/teamsinline.scss";
const UsersInline = ({ database }) => {
	const [users, setUsers] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const stuff = async () => {
			try {
				const users = await Database.Users.all({ db: database });
				setUsers(users);
			} catch (error) {
				console.log("Database is not connected yet.");
			}
		};
		stuff();
	}, [database]);
	return (
		<div className="teams-inline">
			<div className="top">
				<h1>Users</h1>
				<div className="controls">
					<Link className="qrcode" to="/users/qrcode">
						QRCode
					</Link>

					<Link className="qrcode" to="/users/qrcode/load">
						Load
					</Link>
					<button
						style={{ marginRight: "10px" }}
						onClick={() => {
							localStorage.removeItem("user");
							alert("done");
						}}
					>
						Discard
					</button>
					<Link className="new" to="/users/new">
						New
					</Link>
				</div>
			</div>
			<div className="bottom">
				{users.map((item, index) => {
					const handleDelete = async () => {
						const isAccepted = window.confirm(
							`Are you sure you want to delete user, ${item.username} | ${item.name}?`
						);
						if (!isAccepted) return;
						await Database.Users.delete({
							db: database,
							id: item.id,
						});
						setUsers(users.filter((newItem) => newItem !== item));
					};
					return (
						<UserInline
							key={index}
							{...item}
							handleDelete={handleDelete}
						></UserInline>
					);
				})}
			</div>
		</div>
	);
};

export default UsersInline;
