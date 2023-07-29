import "../styles/globals.css";
import Layout from "../components/layout/layout";
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material/styles";
import { useRouter } from "next/router";

// import { store } from '../src/redux/store';
// import { Provider } from 'react-redux';

const theme = createTheme();

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        {router.pathname === "/game" ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            {/* <Provider store={store}> */}
            <Component {...pageProps} />
            {/* </Provider> */}
          </Layout>
        )}
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default MyApp;
