import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../../Config/Firebase";


function EditInfoForm(props) {
  const [updatedData, setUpdatedData] = useState({
    adress: "",
    email: "",
    telephone: "",
    policies: "",
  })
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "info", "XEekKSA7mS7ID8CzrKvI");

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const document = {
          id: docSnap.id, ...docSnap.data()
        }
        setUpdatedData({
          adress: document.adress,
          email: document.email,
          telephone: document.telephone,
          policies: document.policies,
        })
        console.log(document);

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
    const docRef = doc(db, "info", "XEekKSA7mS7ID8CzrKvI");
    await updateDoc(docRef, updatedData)
      .then(() => {
        console.log('Data successfully updated!');
      })
      .catch((error) => {
        console.error('Error updating data: ', error);
      });
  })


  return (
    <div>
      <div className="infoForm">
        <h1>Edit hotel information</h1>
        <label htmlFor="">
          Adress
          <br />
          <input
            type="text"
            onChange={handleChange}
            name="adress"
          />
        </label>
        <label htmlFor="">
          Email Adress
          <br />
          <input
            type="text"
            onChange={handleChange}
            name="email"

          />
        </label>
        <label htmlFor="">
          Telephone Number
          <br />
          <input
            type="text"
            onChange={handleChange}
            name="telephone"
          />
        </label>
        <label htmlFor="">
          Hotel Policies
          <br />
          <textarea
            onChange={handleChange}
            name="policies"
          />
        </label>
        <button onClick={updateData} className="formButtons">Save Changes</button>
      </div>

    </div>
  )
}

export default EditInfoForm