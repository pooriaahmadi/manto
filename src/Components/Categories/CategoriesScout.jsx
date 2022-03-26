import { useState, useEffect } from "react";
import CategoryScout from "./CategoryScout";
import Database from "../../Database";
import "../../assets/scss/categoriesscout.scss";
const CategoriesScout = ({ database, matchId }) => {
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		const stuff = async () => {
			const categories = await Database.Categories.all({ db: database });
			setCategories(categories);
		};
		stuff();
	}, [database]);
	return (
		<div className="categories">
			{categories.map((item) => (
				<CategoryScout
					database={database}
					matchId={matchId}
					key={item.id}
					{...item}
				/>
			))}
		</div>
	);
};

export default CategoriesScout;
