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
        {!userRole && <Route path="/" element={<Home setIsAuthenticated={setIsAuthenticated} />} />}
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/ClientRoom" element={isAuthenticated ? <ClientRoom roomId={roomId} setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />}></Route>
        <Route path="/bookRoom" element={isAuthenticated ? <BookRoom roomId={roomId} setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
