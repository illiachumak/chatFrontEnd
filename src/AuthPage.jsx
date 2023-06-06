import React from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";





import { initializeApp } from "firebase/app";

import { getDatabase, set, ref, update, onValue } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBkTOrTblEMljuWYGB4kmm93M3c-rfvkd8",
  authDomain: "persprojauth555.firebaseapp.com",
  databaseURL: "https://persprojauth555-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "persprojauth555",
  storageBucket: "persprojauth555.appspot.com",
  messagingSenderId: "861020334162",
  appId: "1:861020334162:web:9697c67eff12d7a34f978b",
  measurementId: "G-KSY7V626QR"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();


const AuthPage = (props) => {

const onSubmitForm = (e) =>{
  e.preventDefault();
}

  // Sign in with google
  

  const onClickGoogle = () => {
    let username;
    let roomId;
    const getRoomId = async () => {
      const roomId = await window.prompt("Enter Room Id", "RoomId");
      return roomId
      }

    const signInGoogle = (roomId) =>{
      signInWithPopup(auth, provider)
      
      .then((userCredential) => {
        //signing in
        const dt = new Date(); 
        const user = userCredential.user;
       
        update(ref(db, 'Users/' + user.uid),{
          last_login: dt,
        })
       
    
    //reading username from db
          const userId = auth.currentUser.uid;
          onValue(ref(db, 'Users/' + userId), (snapshot) => {
            const username = (snapshot.val() && snapshot.val().username) || 'Anonymous'
            
            axios
            .post(`http://${lh}:3001/authenticate`, {
              username: username,
              roomId: roomId,
            })
            .then((response) => {
              console.log(response.data)
              
                props.onAuth(response.data);
                props.roomId(roomId);
             
            })
            .catch((error) => {
               console.log("error", error);
            });
          }, {
            onlyOnce: true
          });
          })
          
    
    


}

          
getRoomId().then(roomId => {
 signInGoogle(roomId)
});


}

/////////////////////////////////////////////
  
  const onSubmit2 = (e) => {
    e.preventDefault();
    const { value: email } = e.target[0];
    const { value: username } = e.target[1];
    const { value: password } = e.target[2];

     
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    
    set(ref(db, 'Users/' + user.uid),{
      username: username,
      email: email,
    })
    alert("User Created!");

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(`Error ${errorMessage}`);
  });

  };

  const ip = "54.163.35.102";
  const lh = "localhost";

  const onSubmit = async (e) => {
    e.preventDefault();
    const { value: email } = e.target[0];
    const { value: password } = e.target[1];
    let roomId = await window.prompt("Enter Room Id", "roomId");

  

    const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    //signing in
    const dt = new Date(); 
    const user = userCredential.user;
   
    update(ref(db, 'Users/' + user.uid),{
      last_login: dt,
    })
    alert("User logged in!");

//reading username from db
      const userId = auth.currentUser.uid;
      onValue(ref(db, 'Users/' + userId), (snapshot) => {
        const username = (snapshot.val() && snapshot.val().username) || 'Anonymous'
        axios
      .post(`http://${lh}:3001/authenticate`, {
        username: username,
        roomId: roomId,
      })
       .then((response) => {
        console.log(response.data)
        
          props.onAuth(response.data);
          props.roomId(roomId);
       
      })
       .catch((error) => {
         console.log("error", error);
       });


      }, {
        onlyOnce: true
      });
     



  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(`Error ${errorMessage}`);
  })
};

  return (
    <div className="background">
      <div className="form-card">
      <form onSubmit={onSubmit} >
        <div className="auth">
          <div className="auth-label">Email</div>
          <input className="auth-input" name="email" />
        </div>
        <div className="auth register">
          <div className="auth-label reg-label">Password</div>
          <input className="auth-input reg-input" name="secret" />
          <button className="auth-button" type="submit" >
            Enter
          </button>
        </div>
        
      </form>
      
      <button className="social-signin google" onClick={() => onClickGoogle()}>Sign in with Google</button>
      </div>     
      <form onSubmit={onSubmit2} className="form-card">
        <div className="auth">
          <div className="auth-label">Email</div>
          <input className="auth-input" name="email" />
        </div>
        <div className="auth">
          <div className="auth-label">Username</div>
          <input className="auth-input" name="username" />
        </div>
        <div className="auth register">
          <div className="auth-label reg-label">Password</div>
          <input className="auth-input reg-input" name="secret" />
          <button className="auth-button" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
