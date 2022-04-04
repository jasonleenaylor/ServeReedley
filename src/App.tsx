import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { NeedRequestForm } from "./needRequestForm";
import NeedRequestTable from "./NeedRequestTable";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from "./theme";
import NeedSubmitted from "./NeedSubmitted";
import "./i18n";
import { useTranslation } from "react-i18next";

export default function App() {
  const { t } = useTranslation();
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div style={{ width: "100%" }}>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/request-need">
              <NeedRequestForm t={t} />
            </Route>
            <Route path="/need-submitted">
              <NeedSubmitted />
            </Route>
            <Route path="/requests">
              <NeedRequestTable t={t} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

function Home() {
  return <h2>Home</h2>;
}
