import Navbar from "../Components/Navbar";
import { FaCar, FaGlassMartini, FaHiking, FaSpa, FaUser } from "react-icons/fa";
import Rooms from "../Components/Rooms";
import Footer from "../Components/Footer";
import { Button, Paper, TextField } from "@mui/material";


function Contact() {
    return (
        <div>
            <Navbar />
            <div className="contactBody">
            <div className="formContainer">
            <Paper className="formPaper">
                        <div className="formSide">
                            <h1>Contact Us</h1>
                            <p style={{ color: "#111a21", fontWeight: "lighter",fontSize:"0.9rem",marginTop: "10px" }}>
                                Ante in nibh mauris cursus mattis molestie. Faucibus vitae aliquet nec ullamcorper sit amet.
                            </p>
                            <form className="contactForm">
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Name"

                                    className="inputField"

                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Email"
                                    className="inputField"

                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Message"
                                    className="inputField"

                                />
                                <Button variant="contained" sx={{ backgroundColor: "#61dafb" }}>Contact</Button>
                            </form>
                            <div>
                            </div>
                        </div>
                        <div className="formImg" >
                            <img src={require("../../assets/contact.png")} />
                        </div>
               
                </Paper>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Contact;
