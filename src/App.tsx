import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import Home from "./components/Home";
import WeatherCard from "./components/WeatherCard";
import { City } from "./interfaces/interfaces";

function App() {
  const locations: City[] = [
    {
      oulu: { lat: "65.01236", lng: "25.46816" },
    },
    { helsinki: { lat: "60.192059", lng: "24.945831" } },
  ];

  return (
    <Router>
      <div className="App">
        <h1 id="appName">Weather app</h1>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/weather/:city"
            element={<WeatherCard locations={locations} />}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
