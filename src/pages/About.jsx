import React from "react";
import Header from "../components/HeaderAbout"
import "./About.css"


const About = (props) => {


  return (
    <div className="wrapper">
      <Header/>
      <div className="background">
      <div className="persprojchat">
      <h1>PersprojChat</h1>
      <h2>Made by Illia Chumak</h2>
      <div className="links">
        <a href="https://t.me/cr0ss_f1re" className="round-link tg">
         
        </a>
        <a href="mailto: illia.chumak.2017@gmail.com" className="round-link ml">
          
        </a>
        <a href="https://github.com/illiachumak/chatFrontEnd" className="round-link gh">
          
        </a>
      </div>
    </div>
      </div>
    </div>
    
  )};

export default About;
