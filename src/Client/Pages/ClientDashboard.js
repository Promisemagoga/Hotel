import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Config/Firebase';

function ClientDashboard({ setRoomId }, props) {
  const navigate = useNavigate()
  const [rooms, setRooms] = useState([]);
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
    } catch (error) {
      console.log(error);
    }
  };

  function viewRoom(event, roomId) {
    console.log(roomId);
    setRoomId(roomId);
    navigate("/ClientRoom")
  }




  return (
    <div className='client--dashboard'>
      <Navbar/>
      <div className="grid-container">
        {rooms.map((data, index) => (
          <div key={index} className="grid-item">
            <img src={data.mainImageUrl} alt="My Image" className="main-image" />
            <div className="card-info">
              <div className="type-price">
                <h3 className="type">{data.type}</h3>
                <h3 className="price">R{data.price}</h3>
              </div>
              <div className="bed-occupants-button">
                <div className='roomInfo'>
                  <h3 className="roomCard-headings">
                    <i className="fa fa-bed" aria-hidden="true"></i>
                    {data.beds}
                  </h3>
                  <br />
                  <h3 className="roomCard-headings">
                    <i className="fa fa-user" aria-hidden="true"></i>
                    {data.occupants}
                  </h3>
                </div>
              </div>
              <button onClick={(event) => viewRoom(event, data.id)} className="viewDealBtn">
                View Deal
              </button>
            </div>

          </div>
        ))}
      </div>
      <br />
      <br />
      <br />

      <Footer/>
    </div>
  )
}

export default ClientDashboard

