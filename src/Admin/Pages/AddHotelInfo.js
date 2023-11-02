import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../Config/Firebase";

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
    <div>
      <div className="infoForm">
        <h1>Add hotel information</h1>
        <label htmlFor="">
          Adress
          <br/>
          <input
            type="text"
            onChange={(event) => setAdress(event.target.value)}
            name="adress"
          />
        </label>
        <label htmlFor="">
          Email Adress
          <br/>
          <input
            type="text"
            onChange={(event) => setEmail(event.target.value)}
            name="email"

          />
        </label>
        <label htmlFor="">
          Telephone Number
          <br/>
          <input
            type="text"
            onChange={(event) => setTelephone(event.target.value)}
            name="telephone"

          />
        </label>
        <label htmlFor="">
          Hotel Policies
          <br/>
          <textarea
            onChange={(event) => setPolicies(event.target.value)}
            name="policies"
          />
        </label>
        <button onClick={AddInfo} className="formButtons">Add</button>
      </div>

    </div>
  );
}

export default AddInfoForm;
