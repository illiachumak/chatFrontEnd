import React from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const AuthPage = (props) => {
  const onSubmit2 = (e) => {
    e.preventDefault();
    const { value: email } = e.target[0];
    const { value } = e.target[1];
    const { value: secret } = e.target[2];
    axios
      .post(`http://${ip}:3001/register`, {
        username: value,
        secret: secret,
        email: email,
      })
      .catch((error) => console.log("error", error));
  };

  const ip = "54.163.35.102";
  const lh = "localhost";

  const onSubmit = async (e) => {
    e.preventDefault();
    const { value } = e.target[0];
    const { value: secret } = e.target[1];
    let roomId = await window.prompt("Enter Room Id", "roomId");

    axios
      .post(`http://${ip}:3001/authenticate`, {
        username: value,
        secret: secret,
        roomId: roomId,
      })
      .then((response) => {
        const { data } = response;
        const updatedData = { ...data, roomId, username: value };
        if (updatedData && updatedData.roomId && updatedData.username) {
          props.onAuth(updatedData);
          props.roomId(roomId);
        } else {
          throw new Error("Недійсні значення передані в onAuth.");
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div className="background">
      <form onSubmit={onSubmit} className="form-card">
        <div className="auth">
          <div className="auth-label">Username</div>
          <input className="auth-input" name="username" />
        </div>
        <div className="auth register">
          <div className="auth-label reg-label">Password</div>
          <input className="auth-input reg-input" name="secret" />
          <button className="auth-button" type="submit">
            Enter
          </button>
        </div>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            let decoded = jwt_decode(credentialResponse.credential, {
              header: false,
            });
            console.log(decoded);

            const { name } = decoded;
            axios
              .post(`http://${ip}:3001/authenticate`, { username: name })
              .then((response) => {
                const secret = window.prompt("Enter Password", "Password");
                return props.onAuth({ ...response.data, secret: secret });
              })
              .catch((error) => console.log("error", credentialResponse));
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </form>

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
