import React, { useState, useEffect } from 'react';
import './Header.css';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { firebaseConfig } from "../FirebaseConfig";
import { getStorage, ref as REF, uploadBytes, getDownloadURL } from "firebase/storage";






const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);

const Header = (props) => {
  const [profileHandler, setProfileHandler] = useState(false);
  const [user, setUser] = useState(undefined);


  const setProfileImage = () => {

    const storageRef = REF(storage, `${props.userId}`);

    const file = document.getElementById("upload-image")
    uploadBytes(storageRef, file).then((snapshot) => {
    console.log(snapshot);
});

  }

  const profileFunc = () => {
    setProfileHandler(prevState => !prevState);
  };

  useEffect(() => {
    const userRef = ref(db, 'Users/' + props.userId);
    const userListener = onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        setUser({
          username: userData.username,
          email: userData.email,
        });
      }
    });

    // Clean up the listener when the component is unmounted
    return () => {
      userListener();
    };
  }, [db, props.userId]);

  return (
    <div>
      <div className={`profile-overlay ${profileHandler ? 'visible' : 'unvisible'}`}>
        <div className={`profile-wrapper ${profileHandler ? 'visible' : 'unvisible'}`}>
          <div className="profile-button" onClick={profileFunc}></div>
          <div className="profile">
                {user && (
                  <>
                    <div className="container-wrapper">
                      <div className="frst">
                    <div className="profile-container">
                    <div className="user-photo"></div>
                    <div className='data-wrapper'>
                    <div className="username-profile">{user.username}</div>
                    <div className='online-profile'>Online</div></div>
                  </div>
                  <span className='email-label'>Email</span>
                  <div className="email">{user.email}</div>
                  </div>
                  <div className="scnd">
                  <span className='set-span'>Set Profile Image</span> 
                  <div className='set-img'>
                  <input type="file" id='upload-image' className='custom-file-input'/>
                  <button onClick={setProfileImage} className='upload-btn'>Upload image</button>
                  </div>
                  </div>
                  </div>
                  </>
                )}
          </div>

        </div>
      </div>
      <div className="header">
        <div className="left">persprojchat</div>
        <button className="right" onClick={profileFunc}>
          PROFILE
        </button>
      </div>
    </div>
  );
};

export default Header;
