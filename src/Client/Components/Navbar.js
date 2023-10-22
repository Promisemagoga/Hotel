import React, { useState } from "react";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";

function Navbar() {
    const [openModal, setOpenModal] = useState(false)
    const [openRegisterModal, setRegisterOpenModal] = useState(false)


    function modal(){
        setOpenModal(true)
    }

    function regModal(){
        setRegisterOpenModal(true)
    }
  return (
    <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
    <div class="container-fluid">
        <a href="#" class="navbar-brand">Pro_Stay</a>
        <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav ms-auto">
                <a href="#home" class="nav-item nav-link active">Home</a>
                <a href="#about" class="nav-item nav-link">About</a>
                <a href="#product" class="nav-item nav-link">Rooms</a>
                <a href="#contact" class="nav-item nav-link">Contact</a>
                <button class="btn btn-outline-success my-2 my-sm-0" onClick={modal}>SignIn</button>
                <button class="btn btn-outline-danger my-2 my-sm-0" onClick={regModal}>SignUp</button>
            </div>
        </div>
    </div>
</nav>
{openModal && <SignIn setOpenModal={setOpenModal}/>}
{openRegisterModal && <SignUp setRegisterOpenModal={setRegisterOpenModal}/>}

</div>
  );
}

export default Navbar;
