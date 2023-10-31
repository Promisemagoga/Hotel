import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "../../Config/Firebase";
import NavBarDash from "../Components/NavBarDash";
import Footer from "../Components/Footer";


function BookRoom(props) {
  const [dates, setDates] = useState({ checkin: "", checkout: "" });

  const [booking, setBooking] = useState([]);
  const [roomId, setRoomId] = useState(props.roomId);
  const [docData, setDocData] = useState(null);

  const navigate = useNavigate()

  const checkAvailability = async () => {
    const bookingRef = collection(db, "booking");
    const q = query(bookingRef);
    const querySnapshot = await getDocs(q);

    var arrAyToStore = []

    querySnapshot.forEach((doc) => {
      // console.log(doc.data().roomdata.type);
      if (doc.data().roomdata.type === docData.type) {
        arrAyToStore.push({ id: doc.id, ...doc.data() });
      }
    });
    console.log(arrAyToStore.length);
    if (arrAyToStore.length >= 0) {
      alert("Room is available for booking");
      navigate("/CheckOut", { state: { dates } })

    } else {
      const matchingDates = [];
      console.log(matchingDates);
      // arrAyToStore.forEach((doc) => {
      //   matchingDates.push(doc.data().dates.checkin);
      // });
      console.log(matchingDates);
      setBooking(matchingDates);
      alert("Room is not available on the selected date.");
    }

    // console.log(querySnapshot);

    // if (querySnapshot.empty) {
    //   alert("Room is available for booking");
    //   navigate("/CheckOut",  { state: { dates } })

    // } else {
    //   const matchingDates = [];
    //   console.log(matchingDates);
    //   querySnapshot.forEach((doc) => {
    //     matchingDates.push(doc.data().dates.checkin);
    //   });
    //   console.log(matchingDates);
    //   setBooking(matchingDates);
    //   alert("Room is not available on the selected date.");
    // }
  };
  console.log(booking);



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
    }
    fetchData()
  }, []);

  if (!docData) return <div>Loading...</div>;


  return (
    <div>
   <NavBarDash/>
      <div className="book--Room">
        <div className="bookingForm">
          <h1 style={{ marginBottom: 50 }}>Check Availability Form</h1>

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
          <hr />
          <button onClick={checkAvailability}>Check Availability</button>
        </div>
        <div className="aboutToBook">
          <h1>{docData.type}</h1>
          <img src={docData.mainImageUrl} className="bookImg" />
          <h2><i className="fa fa-bed" aria-hidden="true"></i>{docData.beds}</h2>
          <h2><i className="fa fa-user" aria-hidden="true"></i>{docData.occupants}</h2>
          <h2><i className="fa fa-money" aria-hidden="true"></i>{docData.price}</h2>
        </div>
      </div>
    <Footer/>
    </div>
  );
}

export default BookRoom;

