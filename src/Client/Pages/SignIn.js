import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Config/Firebase";
import { Visibility, VisibilityOff } from "@mui/icons-material";
function SignIn({ setIsAuthenticated, setOpenModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setIsAuthenticated();
        console.log("User Successfully logged in");
        window.location.reload();
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          alert("No user found with that email address");
        } else if (error.code === "auth/wrong-password") {
          alert("Incorrect password");
        } else {
          console.log(error.message);
        }
      });
  };

  function closeModal() {
    setOpenModal(false)
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
              <h2 style={{ fontSize: 35, marginBottom: 10 }}>Welcome back</h2>
              <label htmlFor="" className="field">
                Email
                <input
                  type="text"
                  className="loginInput"
                  onChange={(event) => setEmail(event.target.value)}
                  required
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

              <p className="forgotSection">Forgot password</p>
              <button onClick={login}>Sign In</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
