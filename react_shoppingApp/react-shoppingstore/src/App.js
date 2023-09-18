import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Routing";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyles from "./styles/global";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
	return (
		<>
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<GlobalStyles />
					<RouterProvider router={router} />
				</ThemeProvider>
			</Provider>
		</>
	);
}

export default App;
