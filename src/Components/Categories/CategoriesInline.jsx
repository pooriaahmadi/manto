import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Database from "../../Database";
import CategoryInline from "./CategoryInline";
import "../../assets/scss/teamsinline.scss";
const CategoriesInline = ({ database, scout = false }) => {
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		const stuff = async () => {
			try {
				const categories = await Database.Categories.all({
					db: database,
				});
				setCategories(categories);
			} catch (error) {
				console.log("Database is not connected yet.");
			}
		};
		stuff();
	}, [database]);
	return (
		<div className="teams-inline categories-inline">
			<div className="top">
				<h1>Categories</h1>
				<div className="controls">
					<Link
						className="qrcode"
						to={
							scout
								? "/categories/qrcode/load/scout"
								: "/categories/qrcode/load"
						}
					>
						Load
					</Link>
					{!scout && (
						<>
							<Link className="qrcode" to="/categories/qrcode">
								QRCode
							</Link>

							<Link className="new" to="/categories/new">
								New
							</Link>
						</>
					)}
				</div>
			</div>
			<div className="bottom">
				{categories.map((item, index) => {
					const handleDelete = async () => {
						const isAccepted = window.confirm(
							`Are you sure you want to delete category, ${item.title}?`
						);
						if (!isAccepted) return;
						await Database.Categories.delete({
							db: database,
							id: item.id,
						});
						setCategories(
							categories.filter((newItem) => newItem !== item)
						);
					};
					return (
						<CategoryInline
							key={index}
							{...item}
							handleDelete={handleDelete}
							database={database}
							scout={scout}
						></CategoryInline>
					);
				})}
			</div>
		</div>
	);
};

export default CategoriesInline;
