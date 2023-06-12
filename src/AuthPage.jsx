import React from "react";
import axios from "axios";
import Header from "./components/Header"





import { initializeApp } from "firebase/app";

import { getDatabase, set, ref, update, onValue } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { firebaseConfig } from "./FirebaseConfig";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();
   

const AuthPage = (props) => {

  const [regisBtn, setRegisBtn] = React.useState(false)
  const onClickRegisBtn = () =>{
  if(regisBtn === false){ setRegisBtn(true)}
  else{
    setRegisBtn(false)
  }
  }



  // Sign in with google
  
  
  const onClickGoogle = () => {
    let username;
    let roomId;
    
    const getRoomId = async () => {
      const roomId = await window.prompt("Enter Room Id", "roomId");
      return roomId
      }

      

    const signInGoogle = (roomId) =>{
      signInWithPopup(auth, provider)
      
      .then((userCredential) => {
        //signing in
        
        const user = userCredential.user;
       
        update(ref(db, 'Users/' + user.uid),{
          login: 'connected',
          
        })
       
    
    //reading username from db
          const userId = auth.currentUser.uid;
          onValue(ref(db, 'Users/' + userId), (snapshot) => {
            const username = snapshot.val().username;
            const photoURL = snapshot.val().photoURL;
            console.log(userId, snapshot, photoURL)
            
            
            
            axios
            .post(`https://${ip}/authenticate`, {
              username: username,
              roomId: roomId,
              photoURL: photoURL
            })
            .then((response) => {
              console.log(response.data)
              
                props.onAuth(response.data);
                props.roomId(roomId);
                props.userID(user.uid);
                props.photoURL(photoURL)
             
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

  const ip = "backend.persprojchat.space";
  const lh = "localhost";


///////////////////////////



  const onSubmit = async (e) => {
    e.preventDefault();
    const { value: email } = e.target[0];
    const { value: password } = e.target[1];
    let roomId = await window.prompt("Enter Room Id", "roomId");
  
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signing in
        const user = userCredential.user;
  
       
  
        
  
        // Reading username from db
        onValue(ref(db, 'Users/' + user.uid), (snapshot) => {
          const username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
          const login = snapshot.val().login;
          let photoURL = snapshot.val().photoURL 
          if(!photoURL){
            photoURL = "https://i.imgur.com/uomkVIL.png";
          }
          
          axios
            .post(`https://${ip}/authenticate`, {
              username: username,
              roomId: roomId,
            })
            .then((response) => {
              
              if (login !== 'connected') {
                update(ref(db, 'Users/' + user.uid), {
                  login: 'connected',
                });
                props.onAuth(response.data);
                props.roomId(roomId);
                props.userID(user.uid);
                props.photoURL(photoURL);
              }
              else{
                alert("This User Has Been Already Connected!!!");
              }
            })
            .catch((err) => {
              console.log("error", err);
            });
        }, {
          onlyOnce: true
        });
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        alert(`Error ${errorMessage}`);
        return; // Stop code execution here
      });
  };
  
  

  return (
    <div className="wrapper">
      
      <div className="background">
        {!regisBtn ? (
          <div className="form-container-wrapper">
          <div className="form-container">
            <div className="form-card">
              <div className="or-span login-span">Sign In</div>
              <form onSubmit={onSubmit}>
                <div className="auth">
                  <div className="auth-label">Email</div>
                  <input className="auth-input" name="email" />
                </div>
                <div className="auth">
                  <div className="auth-label">Password</div>
                  <input className="auth-input" name="secret" />
                  <button className="auth-button" type="submit">
                    Login
                  </button>
                </div>
              </form>
              <div className="or-span">OR</div>
              <button className="social-signin google" onClick={() => onClickGoogle()}>
                Sign in with Google
              </button>
              <span className="regisBtn" onClick={() => onClickRegisBtn()}>
                Do not have an account? Sign up.
              </span>
            </div>
          </div>
          </div>
        ) : (
             <div className="form-container-wrapper">         
              <div className="form-container">
              <form onSubmit={onSubmit2} className="form-card">
              <div className="or-span login-span">Sign Up</div>
              <div className="auth reg">
              <div className="auth-label">Email</div>
              <input className="auth-input" name="email" />
              </div>
              <div className="auth reg">
              <div className="auth-label">Username</div>
              <input className="auth-input" name="username" />
              </div>
              <div className="auth reg">
              <div className="auth-label reg-label">Password</div>
              <input className="auth-input reg-input" name="secret" />
              <button className="auth-button reg-btn" type="submit">
                Register
             </button>
             
             </div>
             <span className="regisBtn" onClick={() => onClickRegisBtn()}>
                Already have an account? Sign in.
              </span>
             </form>
             </div>
             </div>
        )}
      </div>
    </div>
    
  )};

export default AuthPage;
