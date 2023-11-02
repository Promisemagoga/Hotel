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
import { FaBed, FaEdit, FaTrash, FaUser } from 'react-icons/fa';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from '@mui/material';
import EditRoom from './EditRoom';
import { CalendarMonth } from '@mui/icons-material';

function AdminBooking(props) {
    const [loading, setLoading] = useState(false);
    const [docData, setDocData] = useState([]);
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
            <div className="contactBody">
                {loading ? (
                    <div className="loading">
                        <h2 style={{ fontWeight: "lighter", textAlign: "center" }}>Loading...</h2>
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
        </div >
    )
}

export default AdminBooking