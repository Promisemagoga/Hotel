import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBarDash from "../Components/NavBarDash";
import Footer from "../Components/Footer";
import { db } from "../../Config/Firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { CalendarMonth, Hotel, MonetizationOn, Person } from "@mui/icons-material";



function CheckAvailability(props) {
    console.log(props);
    const [loading, setLoading] = useState(true);
    const [roomId, setRoomId] = useState(props.roomId);
    const [docData, setDocData] = useState(null);
    const navigate = useNavigate()
    const [dates, setDates] = useState({ checkin: "", checkout: "" });
    const [booking, setBooking] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);


    const checkAvailabilityBtn = async () => {
        const bookingRef = collection(db, "booking");
        const q = query(bookingRef);
        const querySnapshot = await getDocs(q);

        var arrAyToStore = []

        querySnapshot.forEach((doc) => {
            if (doc.data().roomdata.type === docData.type) {
                arrAyToStore.push({ id: doc.id, ...doc.data() });
            }
        });

        if (arrAyToStore.length > 0) {

            let clash = false;
            arrAyToStore.forEach(doc => {

                const dbCheckIn = new Date(doc.dates.checkin);
                const dbCheckOut = new Date(doc.dates.checkout);
                const userCheckIn = new Date(dates.checkin);
                const userCheckOut = new Date(dates.checkout);

                if (userCheckIn <= dbCheckOut || dbCheckIn >= userCheckOut) {
                    clash = true;
                } 

            });

            if (clash === true) {
               alert("Room is not available on the selected date.");

            } else {
                const currentDate = new Date();
                const userCheckIn = new Date(dates.checkin);
                if (userCheckIn < currentDate) {
                  alert("Please select a future check-in date.");
                } else {
                  console.log("available");
                  alert("Room is available for booking");
                  navigate("/CheckOut", { state: { dates, totalPrice } });
                }
            }

        } else {
            const currentDate = new Date(); // Get the current date
            const userCheckIn = new Date(dates.checkin);
            if (userCheckIn < currentDate) {
              alert("Please select a future check-in date.");
            } else {
              console.log("available");
              alert("Room is available for booking");
              navigate("/CheckOut", { state: { dates, totalPrice } });
            }


        }
    
  

    };

    useEffect(() => {


        if (dates.checkin !== "" && dates.checkout !== "") {
            const roomPrice = docData.price;
            const checkInDate = new Date(dates.checkin);
            const checkOutDate = new Date(dates.checkout);
            const numberOfDays = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
            const calculatedPrice = numberOfDays * roomPrice;
            setTotalPrice(calculatedPrice);
            console.log(calculatedPrice);
        }
    }, [dates])






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



    function bookRoom() {
        navigate("/bookRoom")
    }

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
                            <h1>Check Availability Form</h1>
                            <div style={{ width: "100%" }}>
                                <label htmlFor="">
                                    Check-in
                                    <br />
                                    <input
                                        type="date"
                                        onChange={(event) =>
                                            setDates({ ...dates, checkin: event.target.value })
                                        }
                                    />
                                </label>
                                <br />
                                <br />
                                <label htmlFor="">
                                    Check-out
                                    <br />
                                    <input
                                        type="date"
                                        onChange={(event) =>
                                            setDates({ ...dates, checkout: event.target.value })
                                        }
                                    />
                                </label>
                            </div>
                            <button onClick={checkAvailabilityBtn} className="checkAvailabilityBtn">Check Availability</button>
                        </div>
                        <div className="roomDetSide">
                            <img src={docData.mainImageUrl} className="checkMainImg" />
                            <h1>{docData.type}</h1>
                            <div className="roomDetails ">
                                <h2><CalendarMonth style={{ height: '38px', width: '38px', color: "#61dafb", marginRight: "20px" }} />Check In: <span style={{ color: "green", fontSize: "1.2rem" }}>{dates.checkin}</span></h2>
                                <h2 ><CalendarMonth style={{ height: '38px', width: '38px', color: "#61dafb", marginRight: "20px" }} />Check Out: <span style={{ color: "red", fontSize: "1.2rem" }}>{dates.checkout}</span></h2>
                                <h2><MonetizationOn style={{ height: '38px', width: '38px', color: "#61dafb", marginRight: "20px" }} />R{totalPrice}</h2>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );



}

export default CheckAvailability;

