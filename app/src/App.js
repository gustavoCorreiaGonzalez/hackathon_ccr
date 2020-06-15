import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ThemeProvider } from "@material-ui/core/styles";
import { ThemeProvider as ThemeStyled } from "styled-components";
import GlobalStyle, {
  themeStyled,
  themeMaterialUi,
} from "./components/GlobalStyle";
import "./components/ServiceWorkerWrapper";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/date-fns";
import Loading from "./components/Loading";
import "./components/ServiceWorkerWrapper";
const Home = lazy(() => import("./pages/Home"));
const ListEvents = lazy(() => import("./pages/ListEvents"));

export default function App() {
  return (
    <React.Fragment>
      <Suspense fallback={<Loading />}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <ThemeProvider theme={themeMaterialUi}>
            <ThemeStyled theme={themeStyled}>
              <GlobalStyle />
              <Router>
                <Switch>
                  <Route path="/events/:type">
                    <ListEvents />
                  </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
              </Router>
            </ThemeStyled>
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </Suspense>
    </React.Fragment>
  );
}
