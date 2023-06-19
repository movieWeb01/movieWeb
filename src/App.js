import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import TopRated from "./Components/TopRated";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/TopRated" element={<TopRated />} />
    </Routes>
  );
}

export default App;
