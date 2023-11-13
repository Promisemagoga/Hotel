import logo from './logo.svg';
import './App.css';
import Home from './Client/Pages/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './Config/Firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import About from './Client/Pages/About';
import Contact from './Client/Pages/Contact';
import ClientDashboard from './Client/Pages/ClientDashboard';
import ClientRoom from './Client/Pages/ClientRoom';
import BookRoom from './Client/Pages/BookRoom';
import CheckAvailability from './Client/Pages/CheckAvailability';
import CheckOut from './Client/Pages/CheckOut';
import ClientBooking from './Client/Pages/ClientBookings';
import AdminDash from './Admin/Pages/AdminDash';
import EditRoom from './Admin/Pages/EditRoom';
import AddNewRoomForm from './Admin/Pages/AddRoom';
import AdminBooking from './Admin/Pages/AdminBookings';
import AdminHotelInfo from './Admin/Pages/AdminHotelInfo';
import AddInfoForm from './Admin/Pages/AddHotelInfo';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    null
  );


  const [roomId, setRoomId] = useState("");

  const [userRole, setUserRole] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        const uid = user.uid;
        setIsAuthenticated(user);
      } else {
      }
    });

  }, [])


  useEffect(() => {
    async function getUserRole() {
      const roleRef = collection(db, "users");
      const q = query(roleRef, where("email", "==", auth.currentUser.email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No matching documents");
      } else {
        querySnapshot.forEach((doc) => {
          setUserRole(doc.data().role);
        });
      }

    }

    if (isAuthenticated) {
      getUserRole();
    }

  }, [isAuthenticated])

  return (
    <Router>
      <Routes>
      {userRole === 'client' && <Route path="/" element={<ClientDashboard setRoomId={setRoomId} />} />}
      {userRole === 'admin' && <Route path="/" element={<AdminDash setRoomId={setRoomId} />} />}
      {userRole === 'admin' && <Route path="/About" element={<About setRoomId={setRoomId} />} />}
      {userRole === 'admin' && <Route path="/Contact" element={<Contact setRoomId={setRoomId} />} />}
      {/* {userRole === 'client' && <Route path="/About" element={<About setRoomId={setRoomId} />} />}
      {userRole === 'client' && <Route path="/Contact" element={<Contact setRoomId={setRoomId} />} />}     */}
        {!userRole && <Route path="/About" element={<About setIsAuthenticated={setIsAuthenticated} />} />}
        {!userRole && <Route path="/Contact" element={<Contact setIsAuthenticated={setIsAuthenticated} />} />}

   
 
        {/* <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} /> */}
        <Route path="/AdminDashboard" element={isAuthenticated ? <AdminDash setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />}></Route>
        <Route path="/ClientDashboard" element={isAuthenticated ? <ClientDashboard setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />}></Route>
        <Route path="/ClientRoom" element={isAuthenticated ? <ClientRoom roomId={roomId} setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />}></Route>
        <Route path="/CheckAvailability" element={isAuthenticated ? <CheckAvailability roomId={roomId} setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />}></Route>
        <Route path="/CheckOut" element={isAuthenticated ? <CheckOut roomId={roomId} setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />}></Route>
        <Route path="/ClientBooking" element={isAuthenticated ? <ClientBooking roomId={roomId} setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />}></Route>
        <Route path="/AddRom" element={isAuthenticated ? <AddNewRoomForm roomId={roomId} setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />}></Route>
        <Route path="/AdminBooking" element={isAuthenticated ? <AdminBooking roomId={roomId} setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />}></Route>
        <Route path="/AdminHotelInfo" element={isAuthenticated ? <AdminHotelInfo roomId={roomId} setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />}></Route>
        <Route path="/AddInfo" element={isAuthenticated ? <AddInfoForm roomId={roomId} setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />}></Route>
        {/* <Route path="/EditRoom" element={isAuthenticated ? <EditRoom roomId={roomId} setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />}></Route> */}

      </Routes>
    </Router>
  );
}

export default App;
