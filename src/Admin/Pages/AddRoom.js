import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../../Config/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";
import AdminNav from "../Components/AdminNavBar";
import SideNavBar from "../Components/AdminSideNav";
import { Checkbox, FormControlLabel, FormGroup, Grid, Paper } from "@mui/material";

function AddNewRoomForm() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState("");
  const [beds, setBeds] = useState("");
  const [price, setPrice] = useState("");
  const [occupants, setOccupants] = useState("");
  const [roomQuantity, setRoomQuantity] = useState("");
  const [description, setDescription] = useState("");

  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([])
  const [urls, setUrls] = useState([])

  const handleImages = (event) => {
    for (let i = 0; i < event.target.files.length; i++) {
      const images = event.target.files[i]
      setGalleryImages((prevState) => [...prevState, images]);
    }
  }

  const addButton = async () => {

    var checkboxes = document.querySelectorAll('input[name="roomFacilities"]');
    var checkedValues = [];

    checkboxes.forEach(check => {
      if (check.checked) {
        checkedValues.push(check.value)
      }
    });



    console.log(checkedValues);
    try {
      console.log(galleryImages);
      const img = mainImage.name + v4();
      const roomImgPath = `main/${img}`;
      const storageRef = ref(storage, roomImgPath);
      const galleryUrls = await Promise.all(galleryImages.map(async (image) => {
        const galleryImgPath = `gallery/${image.name + v4()}`;
        const galleryStorageRef = ref(storage, galleryImgPath);
        await uploadBytes(galleryStorageRef, image);
        const url = await getDownloadURL(galleryStorageRef);
        return { image: image.name, url };
      }));
      const uploadRoomimg = uploadBytes(storageRef, mainImage).then(() => {
        getDownloadURL(storageRef).then(async (url) => {
          await addDoc(collection(db, "rooms"), {
            type: type,
            beds: beds,
            price: price,
            occupants: occupants,
            roomQuantity: roomQuantity,
            description: description,
            mainImage: img,
            mainImageUrl: url,
            galleryImages: galleryUrls.map((image) => image.image),
            galleryImagesUrl: galleryUrls.map((image) => image.url),
            roomFacilities: checkedValues,

          });
          // window.location.reload();
          console.log('SUCCESS');
        })
      })
      // console.log( galleryUrls.map((image) => image.url));
      alert("added successfully");

    } catch (error) {
      console.log(error);
    }


  };



  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

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




  return (
    <div className="AdminDashBoard">
      <div class="container-fluid">
        <div class="row flex-nowrap">
          <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light">
            <SideNavBar />
          </div>
          <div className="dashboardContent">
            <AdminNav />
            <div className="Ad">
              <div className="addroomForm ">
                <Paper sx={{ width: "100%", marginTop: "50px", height: "auto", padding: "20px", display: "flex", flexDirection: "column", rowGap: "20px" }}>
                  <h1>Add a new room</h1>
                  <div className="Row">
                    <select
                      name="type"
                      id=""
                      style={{borderRadius:"0%"}}
                      onChange={(event) => setType(event.target.value)}
                    >
                      <option>Type</option>
                      <option>Deluxe</option>
                      <option>Self-Catering</option>
                      <option>Suite</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Price"
                      name="price"
                      onChange={(event) => setPrice(event.target.value)}
                    />
                  </div>
                  <div className="Row">
                    <select
                      name="beds"
                      id=""
                      onChange={(event) => setBeds(event.target.value)}
                      style={{ borderRadius: "0%" }}


                    >
                      <option>Beds</option>
                      <option>1 double bed</option>
                      <option>2 double beds</option>
                      <option>1 Queen bed</option>
                      <option>2 Queen beds</option>
                    </select>
                    <input
                      type="number"
                      max="4"
                      placeholder="Occupants"
                      name="occupants"
                      onChange={(event) => setOccupants(event.target.value)}
                    />
                  </div>
                  <input
                    type="number"
                    className="quantity"
                    placeholder="Number of rooms available"
                    name="quantity"
                    onChange={(event) => setRoomQuantity(event.target.value)}
                    style={{ width: "100%" }}
                  />
                  <textarea
                    name="description"
                    id=""
                    cols="67"
                    rows="10"
                    placeholder="Description"
                    style={{ width: "100%" }}
                    onChange={(event) => setDescription(event.target.value)}
                  ></textarea>

                  <input
                    type="file"
                    className="mainImage"
                    name="mainImage"
                    onChange={(event) => setMainImage(event.target.files[0])}

                  />
                  <input
                    type="file"
                    className="mainImage"
                    name="galleryImages"
                    onChange={handleImages}
                    multiple
                  />
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
                  <button className="formButtons" onClick={addButton}>
                    Add
                  </button>
                </Paper>
              </div>
            </div>
          </div>
        </div>
        {showForm && <AddNewRoomForm setShowForm={setShowForm} />}

      </div>
    </div>
  );
}

export default AddNewRoomForm;
