import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NeedRequestForm } from "./needRequestForm";
import NeedRequestTable from "./NeedRequestTable";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import NeedSubmitted from "./NeedSubmitted";
import "./i18n";
import { useTranslation } from "react-i18next";
import ReportForm from "./ReportForm";
import TeamPicker from "./TeamPicker";
import TeamManagement from "./TeamManagementForm";
import ClothingInventoryPage from "./ClothingInventoryPage";
import "@aws-amplify/ui-react/styles.css";

export default function App() {
  const { t } = useTranslation();
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div style={{ width: "100%" }}>
          {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Routes>
            <Route path="/request-need" element={<NeedRequestForm t={t} />} />
            <Route path="/need-submitted" element={<NeedSubmitted />} />
            <Route path="/requests" element={<NeedRequestTable t={t} />} />
            <Route path="/reports" element={<ReportForm t={t} />} />
            <Route path="/teams" element={<TeamManagement />} />
            <Route path="/team" element={<TeamPicker />} />
            <Route path="/inventory" element={<ClothingInventoryPage />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

function Home() {
  window.location.href = "https://www.servereedley.org";
  return null;
}
