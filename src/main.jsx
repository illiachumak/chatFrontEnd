import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { GoogleOAuthProvider } from '@react-oauth/google';



ReactDOM.createRoot(document.getElementById('root')).render(<GoogleOAuthProvider clientId="861020334162-39ilfgk5i69av0cnor227usctffua56r.apps.googleusercontent.com"><App /></GoogleOAuthProvider>)
