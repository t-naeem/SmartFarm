import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import "bootstrap/dist/css/bootstrap.min.css";

import { auth } from "./firebase";


function App() {
  const [userName, setUserName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
        setLoggedIn(true);
        localStorage.setItem("isLoggedIn", 1);
      } else {
        setLoggedIn(false);
        localStorage.setItem("isLoggedIn", 0);
        setUserName("");
      }
    });
  }, [loggedIn]);

  return (
    <div className="App">
      <Router>
        <Routes>
          {!loggedIn && <Route path="/login" element={<Login />} />}
          {!loggedIn && <Route path="/signup" element={<Signup />} />}
          <Route path="/" element={ loggedIn ? <Home name={userName} /> : <Link to='/login'>GO TO Log In</Link>} />
          {/* <Route path='/*' element={<div>NOT FOUND</div>}/> */}
        </Routes>
      </Router>
    </div>

  );
}

export default App;
