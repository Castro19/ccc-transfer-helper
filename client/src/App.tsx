import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/homePage/HomePage";
import SchedulePage from "./components/schedulePage/SchedulePage";
import TestingBackend from "./components/TestingBackend";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/schedule" element={<SchedulePage />} />
        </Routes>
      </Router>
      <TestingBackend />
    </div>
  );
}

export default App;
