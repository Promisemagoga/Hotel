import React, { useState } from 'react'
import { auth } from '../../Config/authFirebase';
import { Link, useNavigate } from 'react-router-dom';

function SideNavBar({setShowForm}) {
const navigate = useNavigate()
  
  function logOut(event) {
    auth.signOut();
    // navigate("/")
    console.log("User signed out!");
    window.location.reload();
  }

 
  function showAddForm() {
      setShowForm(true);
  }


  return (
    <div
      class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100"
      style={{ backgroundColor: "#ffffff", borderRadius: "20px" }}
    >
      <Link
        to="/AdminDashboard"
        class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span class="fs-5 d-none d-sm-inline">
          {" "}
          <h1>Pro_Stay</h1>
        </span>
      </Link>
      <ul
        class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
        id="menu"
      >
        <li class="nav-item">
          <Link to="/AdminDashboard" class="nav-link align-middle px-0">
            <i class="fa fa-home" aria-hidden="true"></i>{" "}
            <span class="ms-1 d-none d-sm-inline">Home</span>
          </Link>
        </li>
        <li>
          <Link
            to="/AdminRooms"
            data-bs-toggle="collapse"
            class="nav-link px-0 align-middle"
          >
            <i class="fa fa-bed" aria-hidden="true"></i>{" "}
            <span class="ms-1 d-none d-sm-inline">Rooms</span>{" "}
          </Link>
          <ul
            class="collapse show nav flex-column ms-1"
            id="submenu1"
            data-bs-parent="#menu"
          >
            <li class="w-100">
              <a href="#" class="nav-link align-middle px-0">
                <i class="fa fa-book" aria-hidden="true"></i>{" "}
                <span class="ms-1 d-none d-sm-inline">Bookings</span>
              </a>
            </li>
            <li>
              <Link to="/AdminDashboard" class="nav-link align-middle px-0">
                <i class="fa fa-info-circle" aria-hidden="true"></i>{" "}
                <span class="ms-1 d-none d-sm-inline">Info</span>
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="#" class="nav-link align-middle px-0">
            <i className="fa fa-wrench" aria-hidden="true"></i>{" "}
            <span class="ms-1 d-none d-sm-inline">Settings</span>
          </Link>
        </li>
        <li class="nav-item">
          <Link to="/AddRoom" class="nav-link align-middle px-0">
            <i class="fa fa-plus-circle" aria-hidden="true"></i>{" "}
            <span class="ms-1 d-none d-sm-inline">Add Room</span>
          </Link>
        </li>
        <li class="nav-link align-middle px-0">
          <i class="fa fa-plus-square" aria-hidden="true" style={{ color: "#3D5D22" }}></i>{" "}
          <span class="ms-1 d-none d-sm-inline">Add Hotel Info</span>
          <ul
            class="collapse nav flex-column ms-1"
            id="submenu3"
            data-bs-parent="#menu"
          ></ul>
        </li>
        <li class="nav-link px-0 align-middle">

          <i class="fa fa-sign-out" aria-hidden="true" onClick={logOut} style={{ color: "#3d5d22" }}></i>{" "}
          <span class="ms-1 d-none d-sm-inline" onClick={logOut}>
            Logout
          </span>{" "}

        </li>
      </ul>
      <hr />
      <div class="dropdown pb-4">
        <Link
          to="#"
          class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="./Admin.jpeg"
            alt="admin"
            width="30"
            height="30"
            class="rounded-circle"
          />
          <span class="d-none d-sm-inline mx-1">Profile</span>
        </Link>
      </div>
      {/* {showForm && <AddNewRoomForm />} */}
    </div>
  )
}

export default SideNavBar