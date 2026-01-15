import Firimg from "./assets/head.avif"
import abimg from "./assets/aimg.jpg"
import misimg from "./assets/misimg.avif"
import { useState } from "react";
import './index.css'
import { useNavigate } from 'react-router-dom';
function App() {
  const navigate = useNavigate(); 
  const [ab,setab1]=useState(false);
  
  function home(){
    setab1(false)
  }
  function about(){
    setab1(true)
  }
  function a1(){
    navigate("/login");
  }
  function regform(){
    navigate("/reg");
  }
  function co(){
    navigate("/Contact");
  }
  return (
    <>
    <div id="a1">
      <b id="a2">MoneyMind</b> 
      <div id="a4">
        <div id="a44"><button type="button" className="btn btn-outline-primary cc" onClick={home}>Home</button></div>
        <div id="a44"><button type="button" className="btn btn-outline-primary cc" onClick={about}>About Us</button></div>
        <div id="a44"><button type="button" className="btn btn-outline-primary cc" onClick={co}>Contact Us</button></div>
      </div>
        <div id="a3" className="btn-group">
                      <span type="button" className="btn btn-outline-primary cc" onClick={a1}>Login</span>
                      <span type="button" className="btn btn-outline-primary cc" onClick={regform}>SignUp</span></div>
    </div>


    { !ab && ( 
      <div>
      <div id="a5">
    <img src={Firimg} alt="main" style={{ height: "700px", width: "100%"}}/>
    <div id="a6">Launch Your Financial Future Today</div>
    </div>
    <div id="a7"> <b>OUR ACHIVEMENTS</b></div>
    <hr/>
    <div id="ck">
      <div id="a8">
        <div id="a9" style={{ transition: "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease" }}
>95%</div>


        <b id="a10">Client Satisfication</b>
        <hr style={{width:"70%"}}/>
        <div style={{fontStyle:"Times New Roman, Times, serif"}}>Our clients consistently rate us highly</div>
      </div>
      <div id="a8">
        <div id="a9" style={{paddingLeft:"80px"}}>20</div>
        <b id="a10">Years of experience </b>
        <hr style={{width:"70%"}}/>
        <div style={{fontStyle:"Times New Roman, Times, serif"}}>Decades of financial wisdom at your service</div>
      </div>
      <div id="a8">
        <div id="a9">100Cr</div>
        <b id="a10">Transaction in a Year</b>
        <hr style={{width:"70%"}}/>
        <div style={{fontStyle:"Times New Roman, Times, serif ",width:"80%"}}>Delivered to clients through trusted financial strategies</div>
      </div>
      </div>
      <div id="a11" >
       FEATURES
       <ul  className="feature-list">
       <li className="feature-item scroll-text" id="g6">Our platform offers secure finance tracking, easy lending and borrowing management, automated interest calculation, payment reminders, and detailed financial reports—all in a simple, user-friendly interface designed to make money management effortless.</li>
      <li className="feature-item scroll-text" id="g6">MoneyMind simplifies financial management with smart filters, instant request handling, real-time updates, and customizable finance options, helping users make informed decisions and maintain transparency in every transaction.</li>
      <li className="feature-item scroll-text" id="g6">MoneyMind ensures top-notch security with encrypted data storage, secure authentication, and safe transactions, protecting every user’s personal and financial information from unauthorized access or misuse.</li>
      </ul>
      </div>
      
      </div>
    )
      }
      { ab &&
      (<div >
        <div id="b2">About</div>
        <div id="b3">
          <b>MoneyMind is a smart finance management platform designed to simplify lending, borrowing, and tracking payments. We help users manage finances transparently with secure, efficient, and user-friendly tools.</b>
        </div>
        <img src={abimg} alt="aboutimg" id="b4"/>
        <div id="b5">
          <div id="a12">Our Mission</div>
          <div id="ck">
          <img src={misimg} id="b6"/>
          <div id="b7">Our mission is to empower individuals and businesses with a seamless digital finance platform that promotes transparency, simplifies money management, and builds trust through secure, efficient, and accessible financial solutions.
          </div>
          
          </div>
          </div>
          
      </div>)}
    </>
  )
}

export default App


