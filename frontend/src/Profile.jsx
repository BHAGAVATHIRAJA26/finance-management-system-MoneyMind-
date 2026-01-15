import './index.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
function Profile()
{   
  
    const {id}=useParams();
    
    const navigate=useNavigate();
    const [name,setname]=useState("");
    const [a,seta]=useState(null);
    const [email,setemail]=useState("");
    const [gender,setgender]=useState("");
    const [password,setpassword]=useState("");
    const [phoneno,setphoneno]=useState("");
    const [address, setaddress] = useState("");
    
    
    useEffect(()=>{
      axios.get(`http://127.0.0.1:5000/profile/${id}`)
        .then((response)=>{
        seta(response.data);
        setname(response.data.name);
        setemail(response.data.email);
        setgender(response.data.gender);
        setpassword(response.data.password);
        setphoneno(response.data.phoneno);
        setaddress(response.data.address);
        })
        .catch(error=>console.error(error));
    },[]);
        console.log(name)

    function home()
    {
        navigate("/")
    }
    function fi(){
      navigate("/interest")
    }
    function fi11(){
      navigate("/lend")
    }
    function co(){
      navigate("/Contact")
    }
    function up(e){
      e.preventDefault();
      axios
      .post(`http://127.0.0.1:5000/profile/${id}`,{name,email,gender,password,phoneno,address})
      .then((response)=>{
      if(response.data.message){
      alert("Update are Saved Successfully")
      navigate("/profile/"+id)
      window.location.reload();
      }
    })}
    
    return(
        <>
        <div id="a1">
      <b id="a2">MoneyMind</b> 
      <div id="a4">
        <div id="a44"><button type="button" className="btn btn-outline-primary cc" onClick={home}>Home</button></div>
        <div id="a44"><button type="button" className="btn btn-outline-primary cc" onClick={home}>About Us</button></div>
        <div id="a44"><button type="button" className="btn btn-outline-primary cc" onClick={co}>Contact Us</button></div>
        <div id="a44">
          <li className="nav-item dropdown" id="a44">
          <a className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false" id="a44">My Finance</a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" ><button type="button" className="btn btn-outline-primary c99" onClick={fi}>Borrowed </button></a></li>
            <li><a className="dropdown-item" ><button type="button" className="btn btn-outline-primary c99" onClick={fi11}>Lend </button></a></li>

          </ul>
        </li>
          </div>
           <div id="a44"><button type="button" className="btn btn-outline-primary cc" style={{marginLeft:"40px"}}>Profile<i className="bi bi-person-circle"></i></button></div>


      </div></div>
      <form >
      <div>
        <div style={{backgroundColor:"white",height:"130px"}}>
          <b id="ab2">Profile Settings</b>
          <h6 style={{paddingLeft:"20px",color:"rgb(75, 85, 99)"}}>Update your personal information and account details</h6> 
        </div>
        <div id="g">
          <i className="bi bi-person-circle" style={{fontSize:"50px",marginLeft:"50px"}}></i><b id="a2">{name}</b> <br></br>
          <b style={{marginLeft:"50px",color:"rgba(107, 110, 115, 1)"}}>Update your profile information</b>
          
          <div id="g1">
            <div id="g2">
          <label htmlFor="email1" className="form-label">User Name</label>
            <input type="text"  id="email1"  className="form-control" aria-describedby="emailHelp" value={name}  onChange={(e) => setname(e.target.value)}></input>
            </div>
              <div id="g2">
              <label htmlFor="email1" className="form-label">Email address</label>
    <input type="email"  id="email1"  className="form-control" aria-describedby="emailHelp" value={email}  onChange={(e) => setemail(e.target.value)}/>
              </div>
              <div id="g2">
              <label htmlFor="mf">Gender: </label>
              <br></br><br></br>
              <div className="form-check form-check-inline" id="mf">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="male"
      checked={gender === "male"}
      onChange={(e) => setgender(e.target.value)}/>
              <label className="form-check-label" htmlFor="inlineRadio1"> Male</label>
              </div>
              <div className="form-check form-check-inline" id="mf">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="female"
      checked={gender === "female"}
      onChange={(e) => setgender(e.target.value)}/>
                      <label className="form-check-label" htmlFor="inlineRadio2" > Female</label>
              </div></div>
            <div id="g2">
              <label htmlFor="p1" className="form-label">☎Phone No*</label>
              <input type="text" className="form-control" id="p1" value={a?.phoneno} />
              </div>
            <div className="mb-3" id="g2">
                <label htmlFor="p1" className="form-label" >Current Password</label>
                <input type="text" className="form-control" id="p1" value={a?.password}/>
            </div>
            <div className="mb-3" id="g2">
                <label htmlFor="p1" className="form-label">New Password </label>
                <input type="text" className="form-control" id="p1" onChange={(e) => setpassword(e.target.value)}/>
            </div>

            <div style={{width:"80%",marginLeft: "60px",marginTop:"100px"}}>
               <label htmlFor="p21" className="form-label">Address</label>
               <br></br>
              <textarea className="form-control" id="floatingTextarea p21" value={address}  onChange={(e) => setaddress(e.target.value)}></textarea>
            
            </div>


            
              <center style={{marginTop:"100px"}}><button type="button" className="btn btn-primary btn-lg" onClick={up}>Update</button></center>
              
      

          </div>
        </div>
      </div></form>
      </>
      )
    }
export default Profile;
