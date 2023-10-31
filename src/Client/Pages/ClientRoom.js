import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBarDash from "../Components/NavBarDash";
import Footer from "../Components/Footer";
import { db } from "../../Config/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { Hotel, MonetizationOn, Person } from "@mui/icons-material";



function ClientRoom(props) {
    console.log(props);
    const [loading, setLoading] = useState(true);
    const [roomId, setRoomId] = useState(props.roomId);
    const [docData, setDocData] = useState(null);
    const navigate = useNavigate()

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
                    <div className="room">
                        <div style={{ width: "50%" }}>
                            <img src={docData.mainImageUrl} style={{ width: "100%" }} />
                            <div className="imageGalleryClient">

                                {docData.galleryImagesUrl.map((images, index) => (
                                    <div key={index} >
                                        <img src={images} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ width: "50%", marginTop: "10px" }}>
                            <h1>{docData.type}</h1>
                            <h2>Description:</h2>
                            <p style={{ color: "#000" }}>{docData.description}</p>
                            <div className="roomDetails icons">
                                <h2 style={{ display: "flex", flexDirection: "row", columnGap: "10px", alignItems: "center", justifyContent: "center" }}><Hotel style={{ height: '38px', width: '38px', color: "#61dafb" }} />{docData.beds}</h2>
                                <h2 style={{ display: "flex", flexDirection: "row", columnGap: "10px", alignItems: "center", justifyContent: "center" }}><Person style={{ height: '38px', width: '38px', color: "#61dafb" }} />{docData.occupants}</h2>
                                <h2 style={{ display: "flex", flexDirection: "row", columnGap: "10px", alignItems: "center", justifyContent: "center" }}><MonetizationOn style={{ height: '38px', width: '38px', color: "#61dafb" }} />R{docData.price}</h2>
                            </div>
                            <div className="roomDetails">
                                <div>
                                    <h2>Facilities available:</h2>
                                    <ul>
                                        {docData.roomFacilities.map((doc, index) => (
                                            <li key={index} className="facilities">
                                                {doc}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <button onClick={bookRoom} className="viewDealBtn">Check Availability</button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );



}

export default ClientRoom;

