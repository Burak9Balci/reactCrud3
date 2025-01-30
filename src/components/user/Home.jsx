import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="cards">
      <button className="nav" onClick={() => navigate("/profile")}>
        Profile
      </button>
      <button className="nav" onClick={() => navigate("/dashboard/dashboard")}>
        Dashboard
      </button>
    </div>
  );
};
export default Home;
