import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);

serviceWorkerRegistration.register({
	onUpdate: (e) => {
		const { waiting: { postMessage = null } = {}, update } = e || {};
		if (postMessage) {
			postMessage({ type: "SKIP_WAITING" });
		}
		update().then(() => {
			window.location.reload();
		});
	},
});

reportWebVitals();
