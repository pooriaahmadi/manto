import { useState, useEffect } from "react";

const PropertyScout = ({ database, matchId, id, title, type }) => {
	return (
		<div className="property">
			<div className="left">
				{type === 3 ? title.split(",")[0] : title}
			</div>
			<div className="right"></div>
		</div>
	);
};
export default PropertyScout;
