import React, { useState } from 'react'
import AdminNav from '../Components/AdminNavBar';
import { collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../../Config/Firebase';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SideNavBar from '../Components/AdminSideNav';
import AddNewRoomForm from './AddRoom';
import AddInfoForm from './AddHotelInfo';
import EditInfoForm from './EditHotelInfo';
import { FaBed, FaEdit, FaTrash, FaUser, FaUserCircle } from 'react-icons/fa';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from '@mui/material';
import EditRoom from './EditRoom';
import { CalendarMonth } from '@mui/icons-material';

function AdminBooking(props) {
  const [loading, setLoading] = useState(false);
  const [docData, setDocData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querrySnapShot = await getDocs(collection(db, "booking"));
        const data = querrySnapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDocData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  return (
    <div className="AdminDashBoard">
      <div class="container-fluid">
        <div class="row flex-nowrap">
          <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light">
            <SideNavBar />
          </div>
          <div className="dashboardContent">
            <AdminNav/>
            <div className="contactBody">
              <div className='admin-bookings-grid'>
                {loading ? (
                  <div className="loading">
                    <h2 style={{ fontWeight: "lighter", textAlign: "center" }}>Loading...</h2>
                    <div className="loader">
                    </div>
                  </div>
                ) : (
                  docData.map((data, index) => (
                    <div key={index} className="gridItem" style={{backgroundColor:"#fff"}}>
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
                          <h4 ><FaUserCircle style={{ height: '30px', width: '30px', color: "#61dafb", marginRight: "20px" }} />User:<span style={{ color: "#61dafb", fontSize: "1.2rem" }}> {data.userData}</span></h4>
                          <div className="roomInfo">
                            <h4>
                              <FaBed style={{ height: '30px', width: '30px', color: "#61dafb", marginRight: "20px" }} />
                              {data.roomdata.beds}
                            </h4>
                            <br />
                            <h4 >
                              <FaUser style={{ height: '30px', width: '30px', color: "#61dafb", marginRight: "20px" }} />
                              {data.roomdata.occupants}
                            </h4>
                          </div>
                          <h4><CalendarMonth style={{ height: '30px', width: '30px', color: "#61dafb", marginRight: "20px" }} />Check In: <span style={{ color: "green", fontSize: "1.2rem" }}>{data.dates.checkin}</span></h4>
                          <h4 ><CalendarMonth style={{ height: '30px', width: '30px', color: "#61dafb", marginRight: "20px" }} />Check Out: <span style={{ color: "red", fontSize: "1.2rem" }}>{data.dates.checkout}</span></h4>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default AdminBooking