import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
function App() {
  const [view, setView] = useState("landing");
  return (
    <>
      {view === "landing" ? (
        <LandingPage onExplore={() => setView("dashboard")} />
      ) : (
        <Dashboard onBack={() => setView("landing")} />
      )}
    </>
  );
}
export default App;