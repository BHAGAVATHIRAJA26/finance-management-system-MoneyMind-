import './index.css'
import { useState } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';
function Newreg(){
    const navigate=useNavigate();
    const [z1,setz1]=useState(false);
    const [t1,sett1]=useState();
    const [b1,setb1]=useState();
    const [name,setname]=useState();
    const [email,setemail]=useState();
    const [gender,setgender]=useState();
    const [password,setpassword]=useState();
    const [phoneno,setphoneno]=useState();
    const [address,setaddress]=useState();
    const [ew,setew]=useState(false)
    const [gb,setgb]=useState(false)
    const [yr,setyr]=useState(0);
    const [fri,setfri]=useState();
    const [las,setlas]=useState();
    const [sol,setsol]=useState();
    const [ui,setui]=useState(false);
    const [ci,setci]=useState(false);
    const [up,setup]=useState();
    function mi(){
      setci(true);
    }
    function f1(event){
      setname(event.target.value);
    }
    function f2(event){
      setemail(event.target.value);
    }
    function gen(event){
      setgender(event.target.value);
      console.log(event.target.value)
    }
    function yi(event){
      setup(event.target.value);
    }
    function n(){
      setui(true)
    }
    function nex(){
      if(fri===parseInt(las)){
      setew(true)
        }
      else{
        setsol(true)
      }

    }
    function pho(event){
      setphoneno(event.target.value);
    }
    function addr(event){
      setaddress(event.target.value);
    }
    function al(e){
      if(z1==true){
           alert("check a password,email")
        }
      else{
        console.log(name,email,gender,password,phoneno,address)
        e.preventDefault();
      axios
      .post("http://127.0.0.1:5000/reg",{yr:0,name,email,gender,password,phoneno,address,up})
      .then((response)=>{
              if(response.data.message){
              alert("Regisration is successfully completed")
              navigate("/login"); 
              }
              else{
                alert("Your email is already registered")
              }
    })
  }}
    function pass(event){
      setpassword(event.target.value);
      sett1(event.target.value);
    }
    function ck(event){
      const v=event.target.value
      setb1(event.target.value);
      if(v!==t1){
        setz1(true);}
      else{
         setz1(false);
      }
  
    }

    function nb(){
      setyr(1);
      axios
      .post("http://127.0.0.1:5000/reg",{yr:1,name,email})
      .then((response)=>{
              setfri(response.data.no)
              
    })
      setgb(true)
    }
    return (<>
      <form id="f1" onSubmit={al}>
    <div id="c1">
    <center><h2>Create New Account</h2></center><br></br>
    
    { !ew && !ui &&(
      <div>
      <div>
    <label htmlFor="email1" className="form-label">User Name</label>
    <input type="text"  id="email1"  className="form-control" aria-describedby="emailHelp" onChange={f1}/>
    <label htmlFor="email1" className="form-label">Email address</label>
    <input type="email"  id="email1"  className="form-control" aria-describedby="emailHelp" onChange={f2}/>
  </div>
  <br></br>
    <div>
      <label htmlFor="mf">Gender: </label>
      <br></br>
  <div className="form-check form-check-inline" id="mf">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Male" onChange={gen}/>
  <label className="form-check-label" htmlFor="inlineRadio1"> Male</label>
</div>

<div className="form-check form-check-inline" id="mf">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Female" onChange={gen}/>
  <label className="form-check-label" htmlFor="inlineRadio2"> Female</label>
</div>
</div>
      <br></br>
      
       <button type="button" className="btn btn-primary btn-outline-dark"  onClick={nb}>Generate OTP</button>
       { gb && !ui &&( 
        <>
        <h1></h1>
       <input type="text"  id="email1"  className="form-control" aria-describedby="emailHelp" placeholder='Enter a Valid OTP' onChange={(event)=>setlas(event.target.value)}/>
       <br></br>
       {sol && (<p style={{color:"red"}}>OTP is InCorrect</p>)}
       
       <center><button type="button" className="btn btn-primary btn-outline-dark"  onClick={nex}>NEXT --> </button></center>
       </>
       )}
      </div>
    )}


  {ew && !ui &&(<div>

  <div className="mb-3">
    <label htmlFor="p1" className="form-label" >Password</label>
    <input type="text" className="form-control" id="p1"  value={t1} onChange={pass} />
  </div>
  <div className="mb-3">
    <label htmlFor="p1" className="form-label">Re type-Password</label>
    <input type="text" className="form-control" id="p1"  value={b1} onChange={ck}/>
  </div>
  {z1 && <p style={{color:"red"}}>Password is InCorrect</p>}
  <label htmlFor="p1" className="form-label">☎Phone No*</label>
    <input type="text" className="form-control" id="p1" onChange={pho}/>
    <label htmlFor="p1" className="form-label">Address*</label>
    <input type="text" className="form-control" id="p1" onChange={addr}/>
  <div></div>
  <br></br>
  <center><button type="button" className="btn btn-primary btn-outline-dark"  onClick={n}>NEXT --> </button></center>
  </div>)}
  {ui && (<div>

    

    <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="c1y" onClick={mi}/>
    <label className="form-check-label" htmlFor="c1y"  >Access a terms and condition </label>
    

  </div>

    <div className="btn-group">
  <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    click me
  </button>
  <ul className="dropdown-menu">
    <li>
      <span className="dropdown-item-text custom-height">
  <th>Terms and Conditions:</th>
    MoneyMind helps users manage lending, borrowing, and financial tracking but does not provide financial or legal advice. Users are responsible for the accuracy of their data and for keeping their login details secure. MoneyMind uses secure systems but is not liable for losses, disputes, or errors, and continued use means acceptance of updated terms.
</span>

    </li>
  </ul>
</div>


{ ci &&(<div>
  <br></br>
<div className="mb-3">
    <label htmlFor="p1" className="form-label">UPI ID (valid)</label>
    <input type="text" className="form-control" id="p1" onChange={yi}/>
  </div>
<br></br>
<br></br>
     <center><button type="submit" className="btn btn-primary btn-outline-dark" >Submit</button></center>

</div>)}

  </div>)}
  </div>
</form>
    </>);
}
export default Newreg