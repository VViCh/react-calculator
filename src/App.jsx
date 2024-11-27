import Calculator from "./components/calculator";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Support from "./components/support";
import "./App.css";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/"element={<Calculator />}/>
          <Route path="/support" element={<Support />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
