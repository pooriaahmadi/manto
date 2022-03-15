import "../../assets/scss/error.scss";

const ErrorElement = ({ content }) => {
	return (
		<div className="error_message">
			<p>{content}</p>
		</div>
	);
};

export default ErrorElement;
