import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../Config/Firebase";
import { Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";

function EditInfo({ infoId, setEditForm }) {
  const [updatedData, setUpdatedData] = useState({
    email: "",
    address: "",
    telephone: "",
    policies: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "info", infoId);
      console.log(infoId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const document = {
          id: docSnap.id,
          ...docSnap.data(),
        };
        setUpdatedData({
          adress: document.adress,
          email: document.email,
          telephone: document.telephone,
          policies: document.policies,
        });
      } else {
        console.log("No such document!");
      }
    };
    fetchData();
  }, []);

  function handleChange(event) {
    setUpdatedData({
      ...updatedData,
      [event.target.name]: event.target.value,
    });
  }

  async function updateData() {
    const docRef = doc(db, "info", infoId);
    await updateDoc(docRef, updatedData)
      .then(() => {
        console.log("Data successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating data: ", error);
      });
  }

  function closeModal() {
    setEditForm(false);
  }

  const { email, adress, telephone, policies } = updatedData;

  return (
    <div className="roomForm">
      <div className="editRoom">
        <h2
          style={{
            color: "#000",
            fontWeight: "lighter",
            textAlign: "right",
            padding: 3,
            cursor: "pointer",
          }}
          onClick={closeModal}
        >
          X
        </h2>
        <h1 style={{ textAlign: "center", marginBottom: "50px" }}>
          Update room
        </h1>
        <div className="roomEditForm">
          <input
            placeholder="Email Address"
            name="email"
            style={{ width: "100%", height: "50px" }}
            onChange={handleChange}
            value={email}
          />
          <input
            placeholder="Address"
            name="adress"
            style={{ width: "100%", height: "50px" }}
            onChange={handleChange}
            value={adress}
          />
          <input
            placeholder="Telephone"
            name="telephone"
            style={{ width: "100%", height: "50px" }}
            onChange={handleChange}
            value={telephone}
          />
          <input
            placeholder="Policies"
            name="policies"
            style={{ width: "100%", height: "50px" }}
            onChange={handleChange}
            value={policies}
          />
          <button className="formButtons" onClick={updateData}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditInfo;
