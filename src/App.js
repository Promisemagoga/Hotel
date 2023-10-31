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
        {!userRole && <Route path="/" element={<Home setIsAuthenticated={setIsAuthenticated} />} />}
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        {userRole === 'client' && <Route path="/ClientRoom" element={<ClientDashboard setRoomId={setRoomId} />} />}
      </Routes>
    </Router>
  );
}

export default App;
