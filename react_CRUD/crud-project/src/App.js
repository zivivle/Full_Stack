import "./App.css";
import { ThemeProvider } from "styled-components";
import theme from "styles/theme";
import GlobalStyles from "styles/global";
import { RouterProvider } from "react-router-dom";
import router from "routes/Routing";

function App() {
	return (
		<>
			<ThemeProvider theme={theme}>
				<GlobalStyles />
				<RouterProvider router={router} />
			</ThemeProvider>
		</>
	);
}

export default App;
