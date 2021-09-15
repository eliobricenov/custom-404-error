import React from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";
import App, { AppContext, AppProps } from "next/app";
import theme from "../src/theme";
import { CssBaseline, ThemeProvider } from "@material-ui/core";

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const { route } = router;

	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement?.removeChild(jssStyles);
		}

		const handleRouteChange = (url: URL) => {};

		//When the component is mounted, subscribe to router changes
		//and log those page views
		router.events.on("routeChangeComplete", handleRouteChange);

		// If the component is unmounted, unsubscribe
		// from the event with the `off` method
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router.events]);

	return (
		<ThemeProvider theme={theme}>
			{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
			<CssBaseline />
			<Component {...pageProps} />
		</ThemeProvider>
	);
}

export default MyApp;

MyApp.getInitialProps = async (context: AppContext) => {
	const appProps = await App.getInitialProps(context);

	return {
		...appProps,
	};
};
