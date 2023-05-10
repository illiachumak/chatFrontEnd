import axios from "axios"
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";



const AuthPage = (props) => {
  
    const onSubmit = (e) => {
      e.preventDefault();
      const { value } = e.target[0];
      const { value: secret } = e.target[1];
      axios.post(
      "http://localhost:3001/authenticate",
      {username: value}
      )
      .then(response => {
        
        return props.onAuth({...response.data, secret: secret})
      })
      .catch(error => console.log("error", error))
    };
    
  
    return (
        <div className="background">



        <GoogleLogin
          onSuccess={credentialResponse => {
            let decoded = jwt_decode(credentialResponse.credential, { header: false });
            console.log(decoded)
            
      const { name } = decoded;
     axios.post(
     "http://localhost:3001/authenticate",
     {username: name}
     )
     .then(r => props.onAuth({...r.data, secret: name})
      .catch(e => console.log("error", credentialResponse)))
     props.onAuth({ username: name, secret: name });
  }}
         
          onError={() => {
            console.log('Login Failed');
          }}
        />;
       
        <form onSubmit={onSubmit} className="form-card">
          
  
          <div className="form-subtitle">Set a username to get started</div>
  
          <div className="auth">
            <div className="auth-label">Username</div>
            <input className="auth-input" name="username" />
            <button className="auth-button" type="submit">
              Enter
            </button>
          </div>
        </form>
      </div>
    );
};
  
export default AuthPage;
