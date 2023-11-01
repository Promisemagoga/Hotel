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
        navigate("/CheckAvailability")
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
                        <div className="imgSide">
                            <img src={docData.mainImageUrl} className="roomMainImg"/>
                            <div className="imageGalleryClient">

                                {docData.galleryImagesUrl.map((images, index) => (
                                    <div key={index} >
                                        <img src={images} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="dataSide">
                            <h1>{docData.type}</h1>
                            <div>
                            <h2>Description:</h2>
                            <p style={{ color: "#000" }}>{docData.description}</p>
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
                            <div className="roomDetails icons">
                                <h2 className="roomDetailsH2 "><Hotel style={{ height: '38px', width: '38px', color: "#61dafb", marginRight:"20px" }} />{docData.beds}</h2>
                                <h2 className="roomDetailsH2 "><Person style={{ height: '38px', width: '38px', color: "#61dafb", marginRight:"20px"  }} />{docData.occupants}</h2>
                                <h2 className="roomDetailsH2 "><MonetizationOn style={{ height: '38px', width: '38px', color: "#61dafb", marginRight:"20px"  }} />R{docData.price}</h2>
                            </div>
                            <button onClick={bookRoom} className="checkAvailabilityBtn">Check Availability</button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );



}

export default ClientRoom;

