import { Link } from "react-router-dom";

const HeaderItem = ({ url, title }) => {
	return (
		<Link className="item" to={url}>
			{title}
		</Link>
	);
};
export default HeaderItem;
