import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NeedRequestForm } from "./needRequestForm";
import NeedRequestTable from "./NeedRequestTable";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from "./theme";
import NeedSubmitted from "./NeedSubmitted";
import "./i18n";
import { useTranslation } from "react-i18next";
import ReportForm from "./ReportForm";
import TeamPicker from "./TeamPicker";

export default function App() {
  // Set the region in the static AWS config on load so that it is available
  // for later code that needs it to call lambda functions
  // Review: Update is synchronous, but the set values aren't immediately available
  // there may be a better solution and there could still be a race condition putting
  // it here.
  var AWS = require("aws-sdk");
  AWS.config.update({ region: "us-west-1" });

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
            <Route path="/reports">
              <ReportForm t={t} />
            </Route>
            <Route path="/team">
              <TeamPicker />
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
  window.location.href = "https://www.servereedley.org";
  return null;
}
