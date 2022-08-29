import { Link } from "react-router-dom";

import "../App.css";

const Home = () => {
  return (
    <div className="home">
      <Link to="/weather/:oulu">Oulu</Link>
      <Link to="/weather/:helsinki">Helsinki</Link>
    </div>
  );
};

export default Home;
