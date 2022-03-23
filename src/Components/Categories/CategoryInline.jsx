import "../../assets/scss/teamsinline.scss";
import { useState, useEffect } from "react";
import PropertyInline from "../Properties/PropertyInline";
import { Link } from "react-router-dom";
import Database from "../../Database";

const CategoryInline = ({
	id,
	title,
	handleDelete,
	database,
	scout = false,
}) => {
	const [properties, setProperties] = useState([]);
	const handleDeleteWrapper = async () => {
		await handleDelete();
		for (let i = 0; i < properties.length; i++) {
			await Database.Properties.delete({
				db: database,
				id: properties[i].id,
			});
		}
	};
	useEffect(() => {
		const stuff = async () => {
			const properties = await Database.Properties.getByCategory({
				db: database,
				category_id: id,
			});
			setProperties(properties);
		};
		stuff();
	}, []);
	return (
		<div className="teams-inline">
			<div className="top">
				<h2>{title}</h2>
				<div className="controls">
					{!scout && (
						<>
							<Link
								style={{ marginRight: "10px" }}
								className="new"
								to={`/properties/category/${id}/new`}
							>
								New
							</Link>
							<button onClick={handleDeleteWrapper}>
								Delete
							</button>
						</>
					)}
				</div>
			</div>
			<div className="bottom">
				{properties.map((item, index) => {
					const handleDelete = async () => {
						const isAccepted = window.confirm(
							`Are you sure you want to delete property, ${item.title}?`
						);
						if (!isAccepted) return;
						await Database.Properties.delete({
							db: database,
							id: item.id,
						});
						setProperties(
							properties.filter((newItem) => newItem !== item)
						);
					};
					return (
						<PropertyInline
							key={index}
							{...item}
							handleDelete={handleDelete}
							scout={scout}
						></PropertyInline>
					);
				})}
			</div>
		</div>
	);
};
export default CategoryInline;
