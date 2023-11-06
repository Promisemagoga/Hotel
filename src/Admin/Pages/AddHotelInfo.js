import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../Config/Firebase";
import { Paper } from "@mui/material";
import SideNavBar from "../Components/AdminSideNav";
import AdminNav from "../Components/AdminNavBar";

function AddInfoForm() {
  const [adress, setAdress] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [map, setMap] = useState("");
  const [policies, setPolicies] = useState("");

  const AddInfo = async () => {
    try {
      const docRef = await addDoc(collection(db, "info"), {
        adress: adress,
        email: email,
        telephone: telephone,
        map: map,
        policies: policies,
      });
      alert("Added Successfuly");
    } catch (error) {}
  };

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
                <h1>Add Hotel Info</h1>
                  <input
                    placeholder="Email Address"
                    name="email"
                    style={{width:"100%",height:"50px"}}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <input
                    placeholder="Address"
                    name="adress"
                    style={{width:"100%",height:"50px"}}

                    onChange={(event) => setAdress(event.target.value)}
                  />
                   <input
                    placeholder="Telephone"
                    name="telephone"
                    style={{width:"100%",height:"50px"}}

                    onChange={(event) => setTelephone(event.target.value)}
                  />
                   <input
                    placeholder="Policies"
                    name="policies"
                    style={{width:"100%",height:"50px"}}

                    onChange={(event) => setPolicies(event.target.value)}
                  />
            
                <button className="formButtons" onClick={AddInfo}>
                  ADD HOTEL INFO
                </button>
              </Paper>
            </div>
          </div>
        </div>
      </div>
      {/* {showForm && <AddNewRoomForm setShowForm={setShowForm} />} */}

    </div>
  </div>
);
}

export default AddInfoForm;
