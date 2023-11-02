import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../../Config/Firebase";
import { Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";

function EditRoom({ roomId, setShowForm }) {
    const [updatedData, setUpdatedData] = useState({
        type: "",
        beds: "",
        price: "",
        occupants: "",
        quantity: "",
        description: "",
        mainImage: "",
        roomFacilities: [],

    })
    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, "rooms", roomId);
            console.log(roomId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const document = {
                    id: docSnap.id, ...docSnap.data()
                }
                setUpdatedData({
                    type: document.type,
                    beds: document.beds,
                    price: document.price,
                    occupants: document.occupants,
                    quantity: document.roomQuantity,
                    description: document.description,
                    mainImageUrl: document.mainImageUrl,
                    roomFacilities: document.roomFacilities,
                })
            } else {
                console.log("No such document!");
            }
        }
        fetchData()
    }, []);





    function handleChange(event) {
        setUpdatedData({
            ...updateData,
            [event.target.name]: event.target.value,
        });
    }



    const updateData = (async () => {
        const docRef = doc(db, "rooms", roomId);
        await updateDoc(docRef, updatedData)
            .then(() => {
                console.log('Data successfully updated!');
            })
            .catch((error) => {
                console.error('Error updating data: ', error);
            });

    })
    function closeModal() {
        setShowForm(false)
    }


    return (
        <div className="roomForm">
            <div className="editRoom">
            <h2 style={{ color: "#000", fontWeight: "lighter", textAlign: "right", padding: 3, cursor: "pointer" }} onClick={closeModal}>X</h2>
                <h1 style={{textAlign:"center",marginBottom: "50px"}}>Update room</h1>
                <div className="roomEditForm">
                    <div style={{display:"flex",flexDirection:"row", columnGap: "5px"}}>
                        <select
                            name="type"
                            id=""
                            onChange={handleChange}
                        >
                            <option>Type</option>
                            <option>Deluxe</option>
                            <option>Self-Catering</option>
                            <option>Suite</option>
                        </select>
                        <select
                            name="beds"
                            id=""
                            onChange={handleChange}
                        >
                            <option>Beds</option>
                            <option>1 double bed</option>
                            <option>2 double beds</option>
                            <option>1 Queen bed</option>
                            <option>2 Queen beds</option>
                        </select>
                    </div>
                    <div style={{display:"flex",flexDirection:"row", columnGap: "5px"}}>
                    <input
                        type="number"
                        placeholder="Price"
                        name="price"
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="occupants"
                        placeholder="Occupants"
                        onChange={handleChange}
                    />
                    </div>
                    <div style={{display:"flex",flexDirection:"row", columnGap: "5px",justifyContent:"center"}}>
                    <input
                        type="number"
                        className="quantity"
                        name="quantity"
                        placeholder="Number of rooms available"
                        onChange={handleChange}
                    />
                        <input
                        type="file"
                        name="mainImage"
                        className="mainImage"
                        onChange={handleChange}
                    />
                    </div>
                    <textarea
                        name="description"
                        id=""
                        cols="67"
                        rows="10"
                        placeholder="Description"
                        onChange={handleChange}
                    ></textarea>
                
                    <h2>Facilities available:</h2>

                    <FormGroup>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <FormControlLabel control={<Checkbox />} label="Free Wifi" name="roomFacilities" />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControlLabel control={<Checkbox />} label="Room Service" name="roomFacilities" />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControlLabel control={<Checkbox />} label="Private Parking" name="roomFacilities" />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControlLabel control={<Checkbox />} label="Bar" name="roomFacilities" />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControlLabel control={<Checkbox />} label="Swimming Pool" name="roomFacilities" />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControlLabel control={<Checkbox />} label="Resturant" name="roomFacilities" />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControlLabel control={<Checkbox />} label="50' HDTV with Netflix, premium cabl" name="roomFacilities" />
                            </Grid>
                        </Grid>
                    </FormGroup>

                    {/* <div className="facilities">
                        <label htmlFor="">
                            <input
                                type="checkbox"
                                name="roomFacilities"
                                value="Free Wifi"
                            />
                            Free Wifi
                        </label>
                        <label htmlFor="">
                            <input
                                type="checkbox"
                                name="roomFacilities"
                                value="Room service"
                            />
                            Room service
                        </label>
                        <label htmlFor="">
                            <input
                                type="checkbox"
                                name="roomFacilities"
                                value="Private parking"
                            />
                            Private parking
                        </label>
                    </div>
                    <div>
                        <label htmlFor="">
                            <input
                                type="checkbox"
                                name="roomFacilities"
                                value="Bar"
                            />
                            Bar
                        </label>
                        <label htmlFor="">
                            <input
                                type="checkbox"
                                name="roomFacilities"
                                value="Swimming pool"
                            />
                            Swimming pool
                        </label>
                        <label htmlFor="">
                            <input
                                type="checkbox"
                                name="roomFacilities"
                                value="Resturant"
                            />
                            Resturant
                        </label>
                    </div>
                    <label htmlFor="">
                        <input
                            type="checkbox"
                            name="roomFacilities"
                            value="50' HDTV with Netflix, premium cable"
                        />
                        50' HDTV with Netflix, premium cable
                    </label> */}
                    <button className="formButtons" onClick={updateData}>
                        Update
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditRoom