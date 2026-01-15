import './index.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState} from 'react';
function Login() {
  const navigate=useNavigate();
  const [p1,setp1]=useState(false);
  const [email,setemail]=useState("");
  const [name,setname]=useState("");
  const [pho,setpho]=useState()
  const [t1,sett1]=useState();
  const [b1,setb1]=useState();
  const [password,setpassword]=useState("");
  const [z1,setz1]=useState();
  const [gb,setgb]=useState(true);
  const [sol,setsol]=useState(false);
  const [ve,setve]=useState(true);
  const [mmm,setmmm]=useState();
  const [a1,seta1]=useState();
  const [a2,seta2]=useState();
  const [a3,seta3]=useState();
  const [a4,seta4]=useState();
  const [a5,seta5]=useState();

  const fi = (e) => setemail(e.target.value);
  const se = (e) => setpassword(e.target.value);
  const vi = (e) => setname(e.target.value);

    function handleSubmit(e){
        e.preventDefault();
      axios
      .post("http://127.0.0.1:5000/login",{mm:0,email,name,password})
      .then((response)=>{
        setp1(response.data.message);
        console.log(response.data.message)
      if(response.data.message===false){
        alert("invalid information")
      }
      else{
        alert("Successfully Login")
      navigate("/product/"+response.data.message)
      }});
    
  }
  function Reg2(){
    navigate("/reg"); 
  }
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
    function tit(){
    setp1(true)
    }
    function nu(){
      setgb(false)
      axios
      .post("http://127.0.0.1:5000/login",{mm:1,email,pho})
      .then((response)=>{
        const otp = response.data.message;
        setmmm(otp)
        console.log(response.data.message)
        if(response.data.message===false){
            alert("Please check a email and phone")
        }
        else{
          console.log("from backend",response.data.message)
          
          console.log("integratedddd",mmm)
        }
      })
    }
    function fitt(e){
       e.preventDefault();
      axios
      .post("http://127.0.0.1:5000/login",{mm:2,email,pho,password})
      .then((response)=>{
        if(response.data.message1){
          alert("Password save successfully")
        }
      })
    }
    function iou(){
      console.log("backend"+mmm+"front"+a1+a2+a3+a4+a5)
      if(parseInt(a1+a2+a3+a4+a5)===mmm){
        setve(false)
      }
      else{
        setsol(true)
      }
    }
  return (

    <>
  
  {!p1 && (
<form id="f1" onSubmit={handleSubmit}>
    <div id="c1">

  <div>
    <center><h2 style={{paddingLeft:"5px"}}>Login</h2></center><br></br>
    <label htmlFor="email1" className="form-label">Email address</label>
    <input type="email"  id="email1"  className="form-control" aria-describedby="emailHelp" onChange={fi}/>
    <br></br>
    <label htmlFor="email21" className="form-label">User Name</label>
    <input type="text"  id="email21"  className="form-control" aria-describedby="emailHelp" onChange={vi}/>
  </div>
  <br></br>
  <div className="mb-3">
    <label htmlFor="p1" className="form-label">Password</label>
    <input type="password" className="form-control" id="p1" onChange={se}/>
  </div>
  <div className="mb-3 form-check" >
    <input type="checkbox" className="form-check-input" id="c1y"/>
    <label className="form-check-label" htmlFor="c1y" style={{display:"inline"}}>Check me out</label><a onClick={tit} style={{cursor:"pointer",color:'red',display:"inline",marginLeft:"100px"}}> Forgot Password</a>
  </div>
  <div><button type="submit" id="b1" className="btn btn-primary btn-outline-dark"  style={{cursor:"pointer",marginTop:"10px"}}>Submit</button></div>
  <br></br>
<div className='a1'><p>Don't have an account ? <a onClick={Reg2} style={{cursor:"pointer",color:'blue'}}> Register here</a></p></div>
<br></br>


</div>
</form>)}
 {p1 && (
    <form id="f1" onSubmit={handleSubmit}>
    <div id="c1">
{ve && (<>
  <div>
    <center><h2 style={{paddingLeft:"5px"}}>password changing</h2></center><br></br>
    
    <label htmlFor="email1" className="form-label">Email address</label>
    <input type="email"  id="email1"  className="form-control" aria-describedby="emailHelp" onChange={fi}/>
    <br></br>
   
    <label htmlfor="p1" className="form-label">Phone No</label>
    <input type="text" className="form-control" id="p1" onChange={(event)=>setpho(event.target.value)}/>
  </div>
  <br></br>
  <button type="button" className="btn btn-primary btn-outline-dark" onClick={nu}>Generate OTP</button>
  { !gb && ( 
        <>
        <h1></h1>
   
        <br></br>
        <label htmlFor="il1" className="form-label">Enter a OTP</label>
        <br></br>
       <div style={{display:"inline"}}>
          <input type="text" id="il1" style={{display:"inline",width:"40px",height:"40px",marginLeft:"30px"}} maxlength="1"  className="form-control" aria-describedby="emailHelp" onChange={(event)=>seta1(event.target.value)}/>
          <input type="text" style={{display:"inline",width:"40px",height:"40px",marginLeft:"20px"}} min="0" max="9" maxlength="1"  className="form-control" aria-describedby="emailHelp" onChange={(event)=>seta2(event.target.value)}/>
          <input type="text" style={{display:"inline",width:"40px",height:"40px",marginLeft:"20px"}} min="0" max="9" maxlength="1" className="form-control" aria-describedby="emailHelp" onChange={(event)=>seta3(event.target.value)}/>
          <input type="text" style={{display:"inline",width:"40px",height:"40px",marginLeft:"20px"}} min="0" max="9" maxlength="1" className="form-control" aria-describedby="emailHelp" onChange={(event)=>seta4(event.target.value)}/>
          <input type="text" style={{display:"inline",width:"40px",height:"40px",marginLeft:"20px"}} min="0" max="9" maxlength="1" className="form-control" aria-describedby="emailHelp" onChange={(event)=>seta5(event.target.value)}/>
       </div>
       <br></br>
       {sol && (<p style={{color:"red"}}>OTP is InCorrect</p>)}
       <br></br>
       <center><button type="button" className="btn btn-primary btn-outline-dark"  onClick={iou}>NEXT --> </button></center>
       </>
       )}
       </>)}

       {!ve && (<>
       <center><h2 style={{paddingLeft:"5px"}}>password changing</h2></center><br></br>
  <div className="mb-3">
    <label htmlfor="p1" className="form-label" >Password</label>
    <input type="text" className="form-control" id="p1"  value={t1} onChange={pass} />
  </div>
  <div className="mb-3">
    <label htmlfor="p1" className="form-label">Re type-Password</label>
    <input type="text" className="form-control" id="p1"  value={b1} onChange={ck}/>
  </div>
  {z1 && <p style={{color:"red"}}>Password is In-Correct</p>}
  <div><button type="submit" id="b1" className="btn btn-primary btn-outline-dark"  style={{cursor:"pointer",marginTop:"10px",marginLeft:"110px"}} onClick={fitt}>Change Password</button></div>
  <br></br>

<br></br>
</>)}
</div>
</form>)}
      </>
  );
}

export default Login

