import Navbar from "../Components/Navbar";
import { FaCar, FaGlassMartini, FaHiking, FaSpa, FaUser } from "react-icons/fa";
import Rooms from "../Components/Rooms";
import Footer from "../Components/Footer";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="homeBody">
        <div className="header">
          <div className="headerContent">
            <h1>Home away from home</h1>
            <hr
             className="horizontalLine"
            />
            <p>Luxurious Rooms Starting from R350 per night</p>
            <button>Contact Us</button>
          </div>
        </div>
        <div className="services">
          <h1>Services</h1>
          <hr
            style={{
              width: "250px",
              height: "10px",
              marginLeft: "auto",
              marginRight: "auto",
              backgroundColor: "#56B2BB",
            }}
          />
          <div className="serviceCard">
            <div className="card">
              <FaGlassMartini
                style={{
                  fontSize: "30px",
                  color: "#61dafb",
                  marginBottom: "30px",
                }}
              />
              <h5>Welcome cocktail</h5>
              <p>
                With supporting text below as a natural lead-in to additional
                content.
              </p>
            </div>
            <div className="card">
              <FaSpa
                style={{
                  fontSize: "30px",
                  color: "#61dafb",
                  marginBottom: "30px",
                }}
              />
              <h5>Spa</h5>
              <p>
                With supporting text below as a natural lead-in to additional
                content.
              </p>
            </div>
            <div className="card">
              <FaCar
                style={{
                  fontSize: "30px",
                  color: "#61dafb",
                  marginBottom: "30px",
                }}
              />
              <h5>Free Shuttle</h5>
              <p>
                With supporting text below as a natural lead-in to additional
                content.
              </p>
            </div>
            <div className="card">
              <FaHiking
                style={{
                  fontSize: "30px",
                  color: "#61dafb",
                  marginBottom: "30px",
                }}
              />

              <h5>Safe Hiking</h5>
              <p>
                With supporting text below as a natural lead-in to additional
                content.
              </p>
            </div>
          </div>
        </div>
          <div className="rooms">
        <h1>Featured Rooms</h1>
        <hr
            style={{
              width: "250px",
              height: "10px",
              marginLeft: "auto",
              marginRight: "auto",
              backgroundColor: "#56B2BB",
            }}
          />
        <Rooms />
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
