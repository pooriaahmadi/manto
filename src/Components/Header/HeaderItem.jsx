import { Link } from "react-router-dom";

const HeaderItem = ({ url, title }) => {
	return <Link to={url}>{title}</Link>;
};
export default HeaderItem;
