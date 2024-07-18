import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {ChakraProvider} from "@chakra-ui/react";
import {theme} from "./theme.ts";
import "./index.css";
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={theme} toastOptions={{defaultOptions: {position: "top"}}}>
    {/*<ThemeProvider theme={muiTheme}>*/}
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    {/*</ThemeProvider>*/}
  </ChakraProvider>
);
