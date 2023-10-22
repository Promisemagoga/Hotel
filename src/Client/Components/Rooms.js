import { FaBed, FaUser } from "react-icons/fa";
import { db } from "../../Config/Firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Rooms({ setRoomId }) {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getRooms();
  }, []);

  const getRooms = async () => {
    try {
      const querrySnapShot = await getDocs(collection(db, "rooms"));
      const data = querrySnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRooms(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  function viewRoom() {
  alert("Please login or register to view move details about the room")
  }

  return (
    <div className="grid-container">
      {loading ? (
        <div className="loading">
        <h2 style={{fontWeight:"lighter"}}>Loading...</h2>
        <div className="loader">
        </div>
        </div>
      ) : (
        rooms.map((data, index) => (
          <div key={index} className="grid-item">
            <img
              src={data.mainImageUrl}
              alt="My Image"
              className="main-image"
            />
            <div className="card-info">
              <div className="type-price">
                <h3 className="type">{data.type}</h3>
                <h3 className="price">R{data.price}</h3>
              </div>
              <div className="bed-occupants-button">
                <div className="roomInfo">
                  <h3 className="roomCard-headings">
                    <FaBed size={20} color="#61dafb" />
                    {data.beds}
                  </h3>
                  <br />
                  <h3 className="roomCard-headings">
                    <FaUser size={20} color="#61dafb" />
                    {data.occupants}
                  </h3>
                </div>
              </div>
              <button
                onClick={viewRoom}
                className="viewDealBtn"
              >
                View Deal
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Rooms;
