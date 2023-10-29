import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../Config/Firebase";
import { Link } from "react-router-dom";
import Map from "./Map";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Facebook, LinkedIn, Twitter } from "@mui/icons-material";

function Footer() {
  const [info, setInfo] = useState([]);
  const getInfo = async () => {
    try {
      const querrySnapShot = await getDocs(collection(db, "info"));
      const data = querrySnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInfo(data);
    } catch (error) {}
  };
  useEffect(() => {
    getInfo();
  }, []);

  const [showMap, setShowMap] = useState(false);
  function show() {
    setShowMap(!showMap);
  }
  return (
    <div>
      {showMap && <Map />}
      {info.map((data, index) => (
        <div className="footer">
          <div className="footerContainer" key={index}>
            <div>
              <h2>Pro_Stay</h2>
              <p style={{ width: "200px" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
                soluta facilis eos quia optio iusto odit atque eum tempore,
                quisquam officiis vero veniam hic.
              </p>
            </div>
            <div>
              <h2>Services</h2>
              <ul>
                <li>Spa</li>
                <li>Free Shuttle</li>
                <li>Safe Hiking</li>
                <li>Free Welcome Cocktails</li>
              </ul>
            </div>
            <div>
              <h2>Navigation</h2>
              <ul>
                <li>
                  {" "}
                  <Link>Home</Link>
                </li>
                <li>
                  {" "}
                  <Link>About Us</Link>
                </li>
                <li>
                  {" "}
                  <Link>Our Rooms</Link>
                </li>
                <li onClick={show}>
                  {" "}
                  <Link>Show Map</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2>Contact Us</h2>
              <ul>
                <li>{data.adress}</li>
                <li>{data.email}</li>
                <li>{data.telephone}</li>
              </ul>
            </div>
          </div>
          <hr
            style={{
              width: "100%",
              backgroundColor: "#fff",
            }}
          />
          <div className="belowFooter">
            <div className="socialMediaIcons">
              <Twitter sx={{ fontSize: 35 }} />
              <LinkedIn sx={{ fontSize: 35 }} />
              <Facebook sx={{ fontSize: 35 }} />
            </div>
            <p>
              {" "}
              © 2023 Copyright: <Link>PromiseMagoga</Link>
            </p>
            <div className="socialMediaIcons">
              <p>
                <Link>Policies</Link>
              </p>
              <p>Ts n Cs</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Footer;
