import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../Config/Firebase";
import NavBarDash from "../Components/NavBarDash";
import Footer from "../Components/Footer";
import { FaBed, FaUser } from "react-icons/fa";
import { CalendarMonth } from "@mui/icons-material";


function ClientBooking() {
  const [docData, setDocData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const roleRef = collection(db, "booking");
      const q = query(roleRef, where("userData", "==", auth.currentUser.email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No matching documents");
      } else {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDocData(data);
        setLoading(false)
      }
    };
    fetchData();
  }, []);


  return (
    <div>
      <NavBarDash />
      <div className="grid-cont">
        {loading ? (
          <div className="loading">
            <h2 style={{ fontWeight: "lighter", textAlign:"center" }}>Loading...</h2>
            <div className="loader">
            </div>
          </div>
        ) : (
          docData.map((data, index) => (
            <div key={index} className="gridItem">
              <img
                src={data.roomdata.mainImageUrl}
                alt="My Image"
                className="main-image"
              />
              <div className="card-info">
                <div className="type-price">
                  <h3 className="type">{data.roomdata.type}</h3>
                  <h3 className="price">R{data.roomdata.price}</h3>
                </div>
                <div className="bed-occupants-button">
                  <div className="roomInfo">
                    <h3>
                      <FaBed style={{ height: '30px', width: '30px', color: "#61dafb", marginRight: "20px" }} />
                      {data.roomdata.beds}
                    </h3>
                    <br />
                    <h3 >
                      <FaUser style={{ height: '30px', width: '30px', color: "#61dafb", marginRight: "20px" }} />
                      {data.roomdata.occupants}
                    </h3>
                  </div>
                  <h3><CalendarMonth style={{ height: '30px', width: '30px', color: "#61dafb", marginRight: "20px" }} />Check In: <span style={{ color: "green", fontSize: "1.2rem" }}>{data.dates.checkin}</span></h3>
                  <h3 ><CalendarMonth style={{ height: '30px', width: '30px', color: "#61dafb", marginRight: "20px" }} />Check Out: <span style={{ color: "red", fontSize: "1.2rem" }}>{data.dates.checkout}</span></h3>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ClientBooking;