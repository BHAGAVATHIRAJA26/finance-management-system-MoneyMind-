import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './index.css'
function Contact(){
    const navigate=useNavigate();
        const [name,setname]=useState();
        const [email,setemail]=useState();
        const [phoneno,setphoneno]=useState();
        const [title,settitle]=useState();
        const [message,setmessage]=useState();
        function home()
        {
            navigate("/")
        }
        function sub(){
            if(name.length===0 || email.length===0 || phoneno.length===0 || title.length===0 || message.length===0){
                alert("Please fill in the information without leaving any fields empty.")
            }
            else{
                axios
                .post("http://127.0.0.1:5000/Contact",{name,email,phoneno,title,message})
                .then((response)=>{
                    if(response.data.message){
                        alert("Your assistance is registered")
                    }
                    else{
                        alert(response.data.message)
                    }
                })
            }
        }
    return (
        <>
<div id="a1">
      <b id="a2">MoneyMind</b> 
      <div id="a4">
        <div id="a44"><button type="button" className="btn btn-outline-primary cc" onClick={home}>Home</button></div>
        <div id="a44"><button type="button" className="btn btn-outline-primary cc" onClick={home}>About Us</button></div>
        <div id="a44"><button type="button" className="btn btn-outline-primary cc">Contact Us</button></div>
      </div>
      
        </div>
        
            <div id="f3">Get in Touch</div>
            <div id="f4">Have a question or need assistance? Feel free to reach out to us through the contact form below. We'll get back to you as soon as possible.</div>
            <br></br>
            <div>
             <div style={{ display: "inline-block" }}>
            <h6 id="f5" style={{marginLeft:"400px",marginTop:"50px"}} htmlFor="tu">User Name (Initial at Last)*</h6>
     <input type="text"  id="tu" className="f111" placeholder='ex: Ram H' onChange={(e) => setname(e.target.value)}></input>
     <hr id="f2"></hr>
     </div>
      <div style={{ display: "inline-block" ,marginLeft:"-180px"}}>
      <h6 id="f5" style={{marginLeft:"400px",marginTop:"50px"}} htmlFor="tu1">Phone No:*</h6>
     <input type="text"  className="f111" onChange={(e)=>setphoneno(e.target.value)} id="tu1"></input>
     <hr id="f2"></hr>
        </div>

        <div style={{ display: "inline-block" }}>
            <h6 id="f5" style={{marginLeft:"400px",marginTop:"50px"}} htmlFor="tu2">Email*</h6>
     <input type="text"  className="f111" placeholder='ex: Ram233@gmail...' onChange={(e)=>setemail(e.target.value)} id="tu2"></input>
     <hr id="f2"></hr>
     </div>
      <div style={{ display: "inline-block" ,marginLeft:"-180px"}}>
      <h6 id="f5" style={{marginLeft:"400px",marginTop:"50px"}} htmlFor="tu3">Title*</h6>
     <input type="text" className="f111" onChange={(e)=>settitle(e.target.value)} id="tu3"></input>
     <hr id="f2"></hr>
        </div>

     <br></br>
     <div id="f6">
        <h6 htmlFor="tu4">Message*</h6>
     <textarea style={{maxwidth:"500px" ,width:"700px"}} onChange={(e)=>setmessage(e.target.value)} id="tu4"></textarea>
     </div>
     <br></br>
     <br></br>
        <center><button type="button" className="btn btn-primary" style={{marginLeft:"100px"}} onClick={sub}>Submit Your Message</button></center>
    </div>


    </>);
}
export default Contact