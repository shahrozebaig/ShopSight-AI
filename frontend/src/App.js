import { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
function App() {
  const [view, setView] = useState(() => {
    return localStorage.getItem("shopsight_view") || "landing";
  });
  useEffect(() => {
    localStorage.setItem("shopsight_view", view);
  }, [view]);
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