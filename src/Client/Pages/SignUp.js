import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../Config/Firebase";
import { Visibility, VisibilityOff } from "@mui/icons-material";
function SignUp({ setIsAuthenticated, setRegisterOpenModal }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const register = () => {
    createUserWithEmailAndPassword(auth, email, password, role)
      .then(async (userCredentials) => {
        const user = userCredentials.user;
        if (userCredentials && user) {
          const docRef = await addDoc(collection(db, "users"), {
            email: email,
            role: role,
          });
        }
        alert("user successfullly added");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error);
      });
  };

  function closeModal() {
    setRegisterOpenModal(false)
  }
  return (
    <div className="login">
      <div className="log">
        <h2 style={{ color: "#000", fontWeight: "lighter", textAlign: "right", padding: 15, cursor: "pointer" }} onClick={closeModal}>X</h2>

        <div className="loginContainer">
          <div className="loginPic">
            <img src="./man.png" alt="" className="picture" />
          </div>
          <div className="loginForm">
            <div className="form">
              <h2 style={{ fontSize: 35, marginBottom: 10 }}>Create Account</h2>
              <label htmlFor="" className="field">
                Email
                <input
                  type="text"
                  className="loginInput"
                  required
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>
              <label htmlFor="" className="field">
                Password
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="loginInput"
                    onChange={(event) => setPassword(event.target.value)}
                    name="password"
                    required
                  />
                  <button onClick={togglePasswordVisibility} style={{ marginLeft: "-30px", color: "#000", backgroundColor: "transparent" }}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </button>
                </div>
              </label>
              <select name="" id="" onChange={(event) => setRole(event.target.value)} required style={{ marginTop: "20px" }}>
                <option value="">Role</option>
                <option value="client">Client</option>
              </select>
              <p className="forgotSection">Forgot password</p>
              <button onClick={register}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
