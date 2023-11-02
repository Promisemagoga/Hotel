import React, { useState } from 'react'
import AdminNav from '../Components/AdminNavBar';
import { collection, deleteDoc, doc, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../../Config/Firebase';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SideNavBar from '../Components/AdminSideNav';
import AddNewRoomForm from './AddRoom';
import AddInfoForm from './AddHotelInfo';
import EditInfoForm from './EditHotelInfo';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from '@mui/material';
import EditRoom from './EditRoom';

function AdminDash(props) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [selectdRoomID, setSelectedRoomID] = useState(null)




    const [hotelInfo, setHotelinfo] = useState([]);
    const getInfo = async () => {
        try {
            const querrySnapShot = await getDocs(collection(db, "info"));
            const data = querrySnapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setHotelinfo(data);
        } catch (error) { }
    };
    useEffect(() => {
        getInfo();
    }, []);

    const deleteFunc = async () => {
        const docRef = doc(db, "info", "XEekKSA7mS7ID8CzrKvI");
        deleteDoc(docRef)
            .then(() => {
                console.log("Document successfully deleted!");
            })
            .catch((error) => {
                console.error("Error removing document: ", error);
            });
    };


    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        getRooms();
    }, []);

    const getRooms = async () => {
        try {
            const collectionRef = collection(db, "rooms");
            onSnapshot(collectionRef, (snapShot) => {
                let collections = [];
                snapShot.forEach((doc) => {
                    collections.push({
                        id: doc.id,
                        ...doc.data()
                    })
                });
                setRooms(collections)
            })

        } catch (error) {
            console.log(error);
        }
    };

    const deleteRoom = (async (id) => {
        const docRef = doc(db, "rooms", id);
        deleteDoc(docRef)
            .then(() => {
                alert('Document successfully deleted!');
            })
            .catch((error) => {
                console.error('Error removing document: ', error);
            })
    })

    function editFunc(data) {
        console.log(data);
        const roomId = data.id
        console.log(roomId);
        setShowForm(!showForm);
        setSelectedRoomID(roomId)
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: "#46464d",

        },

        '&:nth-of-type(even)': {
            backgroundColor: "#1E1E1E",


        },
        // // hide last border
        // '&:last-child td, &:last-child th': {
        //     border: 0,
        //     // backgroundColor: "#46464d",

        // },
    }));

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
                    <div className="AdminDashBoard">
                        <div class="container-fluid">
                            <div class="row flex-nowrap">
                                <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light">
                                    <SideNavBar />
                                </div>
                                <div className="dashboardContent">
                                    <AdminNav />
                                    <div className="Ad">
                                        <TableContainer component={Paper} style={{ marginTop: "50px" }}>
                                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell>Image</StyledTableCell>
                                                        <StyledTableCell align="left">Type</StyledTableCell>
                                                        <StyledTableCell align="left">Details</StyledTableCell>
                                                        <StyledTableCell align="left">Price</StyledTableCell>
                                                        <StyledTableCell align="left">Actions</StyledTableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {rooms.map((data, index) => (
                                                        <StyledTableRow key={index}>
                                                            <StyledTableCell component="th" scope="row">
                                                                <img src={data.mainImageUrl} style={{ width: "100px", height: "100px", borderRadius: "100%" }} />
                                                            </StyledTableCell>
                                                            <StyledTableCell align="left" sx={{ color: "#fff" }}>{data.type}</StyledTableCell>
                                                            <StyledTableCell align="left" sx={{ color: "#fff" }}>{data.description}</StyledTableCell>
                                                            <StyledTableCell align="left" sx={{ color: "#fff" }}>R{data.price}</StyledTableCell>
                                                            <StyledTableCell align="right"  >
                                                                <div className='crud'>
                                                                    <FaEdit size={23} style={{ color: "green" }} onClick={() => editFunc(data)} />
                                                                    <FaTrash size={20} style={{ color: "red" }} onClick={() => deleteRoom(data.id)} />
                                                                </div>
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    ))}
                                                </TableBody>
                                            </Table >
                                        </TableContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {showForm && <EditRoom roomId={selectdRoomID} setShowForm={setShowForm} />}

            </div>
        </div >
    )
}

export default AdminDash