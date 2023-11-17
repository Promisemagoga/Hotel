import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavBarDash from "../Components/NavBarDash";
import Footer from "../Components/Footer";
import { auth, db } from "../../Config/Firebase";
import { addDoc, collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { CalendarMonth, Hotel, MonetizationOn, Person } from "@mui/icons-material";



function CheckOut(props) {
    const [dates, setDates] = useState({ checkin: "", checkout: "" });
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
    const [loadingPayment, setLoadingPayment] = useState(false);

    const [booking, setBooking] = useState([]);
    const [roomId, setRoomId] = useState(props.roomId);
    const [docData, setDocData] = useState(null);

    const navigate = useNavigate()
    const location = useLocation()

    const bookRoom = async () => {
        const dates = location.state.dates
        const totalPrice = location.state.totalPrice
        try {
            const roomRef = doc(db, "rooms", props.roomId);
            const docSnap = await getDoc(roomRef);
            const docRef = await addDoc(collection(db, "booking"), {
                dates: dates,
                roomdata: docSnap.data(),
                userData: auth.currentUser.email
            });
            setLoadingPayment(true)
            alert("Room successfully booked");
            navigate("/ClientBooking")
        } catch (error) {
            console.log(error);
        }

    }

    const cancelBooking = () =>{
        alert("Transaction cancelled")
        navigate("/")
    }

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, "rooms", props.roomId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setDocData(docSnap.data());
                console.log(docSnap.data());
            } else {
                console.log("No such document!");
            }
        };
        fetchData();
    }, []);




    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, "rooms", props.roomId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setDocData(docSnap.data());
                setLoading(false);
                console.log(docSnap.data());
            } else {
                console.log("No such document!");
            }
        }
        fetchData()
    }, []);


    return (
        <div>
            <NavBarDash />
            <div className="contactBody">
                {loading ? (
                    <div className="loading">
                        <h2 style={{ fontWeight: "lighter", textAlign: "center" }}>Loading...</h2>
                        <div className="loader">
                        </div>
                    </div>
                ) : (
                    <div className="availabilityForm">
                        <div className="bookingForm">
                            <div style={{ display: "flex", flexDirection: "column", rowGap: "10px", textAlign: "center" }}>
                                <h1>Payment Details</h1>
                                <p style={{ color: "#000" }}>Complete your booking by providing your banking details</p>
                            </div>
                            <div style={{ width: "100%" }}>
                                <label htmlFor="">
                                    Name Of The Card Holder
                                    <br />
                                    <input
                                        type="email"
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                </label>
                                <br />
                                <br />
                                <label htmlFor="">
                                    Credit Card Number
                                    <br />
                                    <input type="number" />
                                </label>
                                <br />
                                <br />
                                <div style={{ width: "100%", display: "flex", flexDirection: "row", columnGap: "5px" }}>
                                    <label htmlFor="">
                                        Expiry Date
                                        <br />
                                        <input type="date" />
                                    </label>
                                    <br />
                                    <br />
                                    <label htmlFor="">
                                        Cvv
                                        <br />
                                        <input type="number" />
                                    </label>
                                </div>
                            </div>
                            <div style={{ width: "100%", display: "flex", flexDirection: "row", columnGap: "5px" }}>
                                <button onClick={bookRoom} className="paymentBtn">Make Payment</button>
                                <button onClick={cancelBooking} className="cancelBtn">Cancel</button>
                            </div>
                        </div>
                        <div className="roomDetSide">
                            <img src={docData.mainImageUrl} className="checkMainImg" />
                            <h1>{docData.type}</h1>
                            <div className="roomDetails ">
                                <h2><CalendarMonth style={{ height: '38px', width: '38px', color: "#61dafb", marginRight: "20px" }} />Check In: <span style={{ color: "green", fontSize: "1.2rem" }}>{location.state.dates.checkin}</span></h2>
                                <h2 ><CalendarMonth style={{ height: '38px', width: '38px', color: "#61dafb", marginRight: "20px" }} />Check Out: <span style={{ color: "red", fontSize: "1.2rem" }}>{location.state.dates.checkout}</span></h2>
                                <h2><MonetizationOn style={{ height: '38px', width: '38px', color: "#61dafb", marginRight: "20px" }} />R{location.state.totalPrice}</h2>
                            </div>
                        </div>
                    </div>
                )}
                {loadingPayment && (
                    <div className="loading">
                        <h2 style={{ fontWeight: "lighter", textAlign: "center" }}>Processing Payment...</h2>
                        <div className="loader"></div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );



}

export default CheckOut;

