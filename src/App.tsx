import { BrowserRouter as Router } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";

import MainRouter from "./routing/MainRouter";
import theme from "./theme";

const App = () => {
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <MainRouter />
      </MuiThemeProvider>
    </Router>
  );
};

export default App;
