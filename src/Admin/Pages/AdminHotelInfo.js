import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "../../Config/Firebase";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query } from "firebase/firestore";
import { CalendarMonth, Email, Hotel, LocationCity, Map, MonetizationOn, Person, Phone, Policy } from "@mui/icons-material";
import SideNavBar from "../Components/AdminSideNav";
import Footer from "../../Client/Components/Footer";
import AdminNav from "../Components/AdminNavBar";



function AdminHotelInfo(props) {
    const [dates, setDates] = useState({ checkin: "", checkout: "" });
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
    const [loadingPayment, setLoadingPayment] = useState(false);

    const [booking, setBooking] = useState([]);
    const [roomId, setRoomId] = useState(props.roomId);
    const [docData, setDocData] = useState(null);

    const navigate = useNavigate()
    const location = useLocation()

    const [hotelInfo, setHotelinfo] = useState([]);
    const getInfo = async () => {
        try {
            const querrySnapShot = await getDocs(collection(db, "info"));
            const data = querrySnapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setHotelinfo(data);
            setLoading(false)
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

    const [showEditForm, setEditForm] = useState(false);
    function updateFunc() {
        setEditForm(!showEditForm);
    }


    return (
        <div className="AdminDashBoard">
            <div class="container-fluid">
                <div class="row flex-nowrap">
                    <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light">
                        <SideNavBar />
                    </div>
                    <div className="dashboardContent">
                        <AdminNav />
                        <div className="contactBody">
                            <>
                                {loading ? (
                                    <div className="loading">
                                        <h2 style={{ fontWeight: "lighter", textAlign: "center" }}>Loading...</h2>
                                        <div className="loader">
                                        </div>
                                    </div>
                                ) : (
                                    <div className="infoMainContainer">
                                        <div className="hotelDetailsContainer">

                                            <div style={{ width: "100%" }}>
                                                {hotelInfo.map((data, index) => (
                                                    <div className="infoCardContent" key={index}>
                                                        <h3>
                                                            <LocationCity style={{ height: '30px', width: '30px', color: "#61dafb", marginRight: "20px" }} />
                                                            {data.adress}
                                                        </h3>
                                                        <h3>
                                                            <Email style={{ height: '30px', width: '30px', color: "#61dafb", marginRight: "20px" }} /> <i className="fa fa-envelope" aria-hidden="true"></i>
                                                            {data.email}
                                                        </h3>
                                                        <h3>
                                                            <Phone style={{ height: '30px', width: '30px', color: "#61dafb", marginRight: "20px" }} />
                                                            {data.telephone}
                                                        </h3>
                                                        <div className="icons">
                                                            <i
                                                                className="fa fa-facebook-official"
                                                                aria-hidden="true"
                                                            ></i>
                                                            <i
                                                                className="fa fa-twitter-square"
                                                                aria-hidden="true"
                                                            ></i>
                                                            <i className="fa fa-instagram" aria-hidden="true"></i>
                                                        </div>
                                                        <div className="infoCrudButtons">
                                                            <button onClick={deleteFunc} class="btn btn-outline-success my-2 my-sm-0" >Delete</button>
                                                            <button onClick={updateFunc} class="btn btn-outline-danger my-2 my-sm-0">Update</button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mapSide">
                                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28745.29310410046!2d28.22549181340048!3d-25.765224095417107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e956057c13cbcc9%3A0x265c611461e24f9!2sLynnwood%2C%20Pretoria%2C%200081!5e0!3m2!1sen!2sza!4v1699192704465!5m2!1sen!2sza" width="100%" height="100%" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                        </div>
                                    </div>

                                )}
                                <div>
                                    {hotelInfo.map((data, index) => (
                                        <div className="hotelPolicies" key={index}>
                                            <h2>
                                                <Policy style={{ height: '80px', width: '80px', color: "#61dafb", marginRight: "20px" }} />
                                                Hotel Policies
                                            </h2>

                                            <p style={{ color: "#000" }}>{data.policies}</p>
                                        </div>
                                    ))}
                                </div>
                                {loadingPayment && (
                                    <div className="loading">
                                        <h2 style={{ fontWeight: "lighter", textAlign: "center" }}>Processing Payment...</h2>
                                        <div className="loader"></div>
                                    </div>
                                )}
                            </>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );



}

export default AdminHotelInfo;

