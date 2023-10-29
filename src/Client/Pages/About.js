import Navbar from "../Components/Navbar";
import { FaCar, FaGlassMartini, FaHiking, FaSpa, FaUser } from "react-icons/fa";
import Rooms from "../Components/Rooms";
import Footer from "../Components/Footer";

function About() {
  return (
    <div>
      <Navbar />
      <div className="homeBody">
        <div className="aboutHeader">
          <div className="aboutContent">
            <div class="row gallery">
              <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
                <img
                  src={require("../../assets/bedroom.jpg")}
                  class="w-100 shadow-1-strong rounded mb-4"
                  alt="Boat on Calm Water"
                />

                <img
                  src={require("../../assets/cocktail.jpg")}
                  class="w-100 shadow-1-strong rounded mb-4"
                  alt="Wintry Mountain Landscape"
                />
              </div>

              <div class="col-lg-4 mb-4 mb-lg-0">
                <img
                  src={require("../../assets/download.jpeg")}
                  class="w-100 shadow-1-strong rounded mb-4"
                  alt="Mountains in the Clouds"
                />

                <img
                  src={require("../../assets/view.jpg")}
                  class="w-100 shadow-1-strong rounded mb-4"
                  alt="Boat on Calm Water"
                />
              </div>

              <div class="col-lg-4 mb-4 mb-lg-0">
                <img
                  src={require("../../assets/hiking.webp")}
                  class="w-100 shadow-1-strong rounded mb-4"
                  alt="Waves at Sea"
                />

                <img
                  src={require("../../assets/spa.webp")}
                  class="w-100 shadow-1-strong rounded mb-4"
                  alt="Yosemite National Park"
                />
              </div>
            </div>
            <div className="aboutUs">
              <h2>About Us</h2>
              <h4>Get to know us a little more</h4>
              <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus id quod maxime placeat facere possimus, omnis voluptas
                assumenda est, omnis dolor repellendus. Temporibus autem
                quibusdam et aut officiis debitis aut rerum necessitatibus saepe
                eveniet ut et voluptates repudiandae sint et molestiae non
                recusandae. Itaque earum rerum hic tenetur a sapiente delectus,
                ut aut reiciendis voluptatibus maiores alias consequatur aut
                perferendis doloribus asperiores repellat
              </p>
            </div>
          </div>
        </div>
        <div className="services">
          <h1>Our Policies</h1>
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

export default About;
