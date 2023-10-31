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
            <div className="aboutContainer" >
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
            <p style={{ color: "#111a21" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              eu augue ut lectus arcu bibendum at varius vel. Et tortor at risus viverra adipiscing at in.
              Rhoncus mattis rhoncus urna neque viverra justo nec ultrices. Orci nulla pellentesque dignissim enim sit amet venenatis urna. Consequat semper viverra nam libero justo laoreet.
              Curabitur gravida arcu ac tortor dignissim convallis aenean et. Blandit libero volutpat sed cras ornare arcu dui
              vivamus. Ridiculus mus mauris vitae ultricies leo integer. Tortor at auctor urna nunc id cursus.
              <br />
              <br />
              Vitae auctor eu augue ut. Magna ac placerat vestibulum lectus mauris ultrices.
              Eros donec ac odio tempor orci dapibus ultrices in iaculis. Ultricies tristique nulla aliquet enim tortor at auctor
              urna nunc. Blandit turpis cursus in hac habitasse. Risus pretium quam vulputate dignissim suspendisse in est ante.
              Nulla facilisi etiam dignissim diam quis enim. Sed adipiscing diam donec adipiscing tristique risus nec feugiat.
              Sem integer vitae justo eget magna. Fermentum iaculis eu non diam phasellus vestibulum lorem sed risus. Justo donec enim
              diam vulputate. Sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit. Elementum nibh tellus molestie nunc
              non. Aliquet nibh praesent tristique magna sit amet purus gravida quis. Ut tortor pretium viverra suspendisse.
              Vel orci porta non pulvinar. Faucibus purus in massa tempor nec feugiat nisl pretium. Dictumst vestibulum rhoncus est
              pellentesque.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
