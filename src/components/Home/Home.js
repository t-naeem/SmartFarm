import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { RealTimeData } from "../RealTimeData/RealTimeData";
import {ReactFirebaseFileUpload} from "../../upload_images"
import {GoogleMaps} from "../../maps"
import styles from "./home.module.css";

function Home(props) {
  let loggedIn = localStorage.getItem("isLoggedIn");

  return (
    <div className={styles.container}>
    <div className={styles.innerBox}>
      <div>
        {loggedIn ? (
          <div>
            <h1><Link to='/login' onClick={ () => {
              auth.signOut()
              .then(() => {
                console.log('Signed Out');
                localStorage.setItem('isLoggedIn', 0)
              })
              .catch(e=>{
               console.error('Sign Out Error', e);
              });
            }}><h3>Sign out</h3> </Link></h1>
          </div>
        ) : (
          <div>
            <h1>
              <Link to="/login">Login</Link>
            </h1>
            <br />
            <h1>
              <Link to="/signup">Signup</Link>
            </h1>
          </div>
        )}
      </div>

      <hr />
      <h1>{props.name && loggedIn ? `Welcome - ${props.name}` : "Login please"}</h1>
      <hr />
      <h4>See Your Animals' Status Below:</h4> 
      <div>{loggedIn && <RealTimeData/>}</div> 
      <h4>Don't See Familiar Person? Add New Faces by Uploading Their Images.</h4>
      <div>{loggedIn && <ReactFirebaseFileUpload/>}</div>
      <h4>Set your Farm Location.</h4>
      <div>{loggedIn && <GoogleMaps/>}</div>  
    </div>
    </div>
  );
}

export default Home;
