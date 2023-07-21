import '../styles/globals.css'
// import Layout from '../components/layout/layout'
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider
} from "@mui/material/styles";

// import { store } from '../src/redux/store';
// import { Provider } from 'react-redux';

const theme = createTheme();

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>

          {/* <Provider store={store}> */}
            <Component {...pageProps} />
          {/* </Provider> */}

      </StyledEngineProvider>
    </ThemeProvider>
  )
}

export default MyApp
