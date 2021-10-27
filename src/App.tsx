import React from "react";
import { LocalizeProvider } from "react-localize-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { NeedRequestForm } from "./needRequestForm";
import NeedRequestTable from "./NeedRequestTable";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from "./theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizeProvider>
        <Router>
          <div style={{ width: "100%" }}>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/request-need">Need Help?</Link>
                </li>
                <li>
                  <Link to="/requests">View Current Needs</Link>
                </li>
              </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/request-need">
                <NeedRequestForm />
              </Route>
              <Route path="/requests">
                <NeedRequestTable />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </LocalizeProvider>
    </ThemeProvider>
  );
}

function Home() {
  return <h2>Home</h2>;
}
