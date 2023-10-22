import Navbar from "../Components/Navbar";
import { FaCar, FaGlassMartini, FaHiking, FaSpa, FaUser } from "react-icons/fa";
import Rooms from "../Components/Rooms";




function Home() {

  return (
    <div>
      <div className="header">
        <Navbar />
        <div className="headerContent">
          <h1>Home away from home</h1>
          <hr
            style={{
              width: "250px",
              height: "10px",
              marginLeft: "auto",
              marginRight: "auto",
              backgroundColor: "#56B2BB",
            }}
          />
          <p>Luxurious Rooms Starting from R850 pm</p>
          <button>Our Rooms</button>
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
        <div class="row" style={{marginTop: "130px"}}>
          <div class="col-sm-3">
            <div class="card">
              <div class="card-body">
               <FaGlassMartini style={{fontSize:"30px", color: "#61dafb",marginBottom: "30px"}}/>
                <h5 class="card-title">Free welcome cocktail</h5>
                <p class="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
               
              </div>
            </div>
          </div>
          <div class="col-sm-3">
            <div class="card">
              <div class="card-body">
               <FaSpa style={{fontSize:"30px", color: "#61dafb",marginBottom: "30px"}}/>
                <h5 class="card-title">Spa</h5>
                <p class="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
            </div>
          </div>
          <div class="col-sm-3">
            <div class="card">
              <div class="card-body">
               <FaCar style={{fontSize:"30px", color: "#61dafb",marginBottom: "30px"}}/>
                <h5 class="card-title">Free Shuttle</h5>
                <p class="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
            </div>
          </div>
          <div class="col-sm-3">
            <div class="card">
              <div class="card-body">
               <FaHiking style={{fontSize:"30px", color: "#61dafb",marginBottom: "30px"}}/>

                <h5 class="card-title">Safe Hiking</h5>
                <p class="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rooms">
        <h1>Featured Rooms</h1>
     <Rooms/>
      </div>
    </div>
  );
}

export default Home;
