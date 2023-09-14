import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./Auth";
import Call from "./Call";
import Demo from "./Demo";
import Home from "./Home";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/callback" element={<Call />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
