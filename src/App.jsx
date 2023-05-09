import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import MoreInfo from "./MoreInfo";
import NotFound from "./NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/more/:index" element={<MoreInfo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
