import QueueList from "../Components/Queue/QueueList";
import "../assets/queue.scss";
const QueuePage = ({ database, decreaseQueue }) => {
	return (
		<div className="queue">
			<QueueList database={database} />
		</div>
	);
};

export default QueuePage;
