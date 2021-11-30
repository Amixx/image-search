import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import Auth from "./Auth";
import reportWebVitals from "./reportWebVitals";
import { render } from "react-dom";
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import UserContext from "./UserContext";

const Index = () => {
	const [ accessToken, setAccessToken ] = useState(null);
	const contextValue = { accessToken, setAccessToken, isAuthenticated: () => !!accessToken, }

	return (
		<UserContext.Provider value={contextValue}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="auth" element={<Auth />} />
					<Route
						path="*"
						element={
							<main>
								<p>Nothing to see here! :(</p>
							</main>
						}
					/>
				</Routes>
			</BrowserRouter>
		</UserContext.Provider>
	)
}

render(
	<Index />,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
