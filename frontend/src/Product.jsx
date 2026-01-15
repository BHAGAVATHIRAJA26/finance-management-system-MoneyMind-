import './index.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import pl from "./assets/Plus.png"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState,useEffect} from 'react';
function Product()
{   
  const {id}=useParams();
  const [io,setio]=useState(false);
  const navigate=useNavigate();
  const [pr,setpr]=useState([]);
  const [ftype,setftype]=useState("NULL");
  const [itype,setitype]=useState(0);
  const [dtype,setdtype]=useState("NULL");
  const [amt,setamt]=useState(0);
  const [du,setdu]=useState("NULL");
  const [a,seta]=useState();
  const [tt,settt]=useState(true);
  const [ss,setss]=useState(null);
  const [m,setm]=useState();
  useEffect(()=>{
    axios.get(`http://127.0.0.1:5000/product/${id}`)
    .then(response=> setpr(response.data))
    .catch(error => console.error(error));
  },[])

    function finb(){  
      seta(0);
    axios.post("http://127.0.0.1:5000/filter",{ftype,itype,amt,dtype,du})
    .then((response)=>{
      setpr(response.data);
      setftype("NULL");
      setitype(0);
      setdtype("NULL");
      setamt(0);
      setdu("NULL");
    }).catch(error=>console.error(error));
    }  

    function inpro(){
      console.log(ftype,itype,dtype,amt,du)
      
      axios.post(`http://127.0.0.1:5000/insert/${id}`,{ftype,itype,amt,dtype,du})
    .then((response)=>{
        if(response.data.message){
          alert("Your model is Saved!")
        }
    }).catch(error=>console.error(error));
      
    }

    function callme(){
              console.log("idddddddddddddd"+m)
              const formdata=new FormData()
              formdata.append("file",ss)
              formdata.append("idd",m)
              console.log("calling",ss)
              axios.post(`http://127.0.0.1:5000/fileupload/${id}`,formdata,{
                headers: { "Content-Type": "multipart/form-data" }
                  })
              .then((response)=>{
                if(response.data.message){
                  settt(true)
                }
              console.log(response.data.message);
        
    })
      setss(null)
        
    }
    function roo(idd,docu){
      setm(idd)
      console.log("iddddddddd"+idd+docu)
      if(docu==="YES"){
        settt(false)
      }
      else{
      const t=0;
      if(confirm("Cofirm to press a button")){
          const t=1;
          seta(2);
          axios.post(`http://127.0.0.1:5000/product/${id}`,{a:2,idd})
              .then((response)=>{
              console.log(response.data.message);
        
          })
          console.log("no value"+ss)
        }
      else{
        const t=0;
        }
    }
    }
    function home()
    {
        navigate("/")
    }
    function fi(){
      navigate("/interest/"+id)
    }
    function fi11(){
      navigate("/lend/"+id)
    }
    function co(){
      navigate("/Contact")
    }
    function pr1(){
      navigate("/profile/"+id)
    }
    function ins(){
      setio(true)
    }
    
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
           <div id="a44"><button type="button" className="btn btn-outline-primary cc" style={{marginLeft:"40px"}} onClick={pr1}>Profile<i className="bi bi-person-circle"></i></button></div>


      </div>


      {!io && (
      <div>
      

      <div id="b9">
        
        <button type="button" className="btn btn-light" style={{ marginLeft: "-140px" }} onClick={() => {document.getElementById("fr").scrollIntoView({ behavior: "smooth" });}}>
  Add Finance
</button>
        <div id="b10">
        
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false"> Finance Type</a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" onClick={() => setftype("Daily Collection Model")}>Daily Collection Model</a></li>
            <li><a className="dropdown-item" onClick={() => setftype("Weekly Collection Model")}>Weekly Collection Model</a></li>
            <li><a className="dropdown-item" onClick={() => setftype("Long-Term Finance (Daily Interest)")}>Long-Term Finance (Daily Interest)</a></li>
            <li><a className="dropdown-item" onClick={() => setftype("Long-Term Finance (Monthly Interest)")}>Long-Term Finance (Monthly Interest)</a></li>
            <li><a className="dropdown-item" onClick={() => setftype("Monthly Return Finance (EMI Model)")}>Monthly Return Finance (EMI Model)</a></li>
          </ul>
        </li>
        </div>
        <div id="b10" >
        
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false"> Interest(%) Type</a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" onClick={() => setitype(1)}>1%</a></li>
            <li><a className="dropdown-item" onClick={() => setitype(5)}>5%</a></li>
            <li><a className="dropdown-item" onClick={() => setitype(7)}>7%</a></li>
            <li><a className="dropdown-item" onClick={() => setitype(10)}>10%</a></li>
            <li><a className="dropdown-item" onClick={() => setitype(30)}>30% (Loan)</a></li>
            <li><a className="dropdown-item" onClick={() => setitype(100)}>30% above</a></li>

          </ul>
        </li>
        </div>
        <form className="d-flex" role="search" id="bg9">
        <input className="form-control me-2" type="search" placeholder="Search a Amount" aria-label="Search" onChange={(event) => setamt(event.target.value)}/>
      </form>

      <div id="b10">
        
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false"> Document Type</a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" onClick={() => setdtype("YES")}>YES</a></li>
            <li><a className="dropdown-item" onClick={() => setdtype("NO")}>NO</a></li>
          </ul>
        </li>
        </div>

        <div id="b10">
        
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false"> Duration Type</a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" onClick={() => setdu("1 Day")}>1 Day</a></li>
            <li><a className="dropdown-item" onClick={() => setdu("1 Week")}>1 Week</a></li>
            <li><a className="dropdown-item" onClick={() => setdu("100 Day")}>100 Day</a></li>
            <li><a className="dropdown-item" onClick={() => setdu("10 Week")}>10 Week</a></li>
            <li><a className="dropdown-item" onClick={() => setdu("1 Month")}>1 Month</a></li>
            <li><a className="dropdown-item" onClick={() => setdu("3 Month")}>3 Month</a></li>
            <li><a className="dropdown-item" onClick={() => setdu("6 Month")}>6 Month</a></li>
            <li><a className="dropdown-item" onClick={() => setdu("1 Year")}>1 Year</a></li>
            <li><a className="dropdown-item" onClick={() => setdu("More than 1 Year")}>More than 1 Year</a></li>
          </ul>
        </li>
        </div>

        <button type="submit" className="btn btn-light" onClick={finb}> Filter It <i className="bi bi-funnel"></i></button>
      </div>
        <center><div id="b8">SMART FINANCE BEGINS WITH SMART CHOICES</div></center>



        <div id="pop">
         
          {pr?.map(pro=>(
          <div id="c0" key={pro.id}>  
             
            <div id="c1t">
              
            <div id="c5" style={{display:"inline-block",paddingRight:"200px"}} >{pro.username}</div>
            <h6 style={{display:"inline-block"}}>Phone no: {pro.mobileno}</h6>
            <h6 >{pro.address}</h6>
            </div>

            <h6 id="c6">Finance Amount : ₹ {pro.amount}</h6>

            <br></br>
             <hr></hr>
            <div id="oio">
                        <div id="d1">
                          <h6>Finance Type:</h6>
                          <h6> {pro.finance}</h6>
                          
                        </div>
                        <div id="d1">
                          <h6>Interest(%) <span> :</span><span> {pro.interest}%</span></h6>
                        </div>
            </div>
            <hr></hr>
            <div id="oio">
                        <div id="d1">
                          <h6>Duration Type:</h6>
                          <h6>{pro.duration}</h6>
                          
                        </div>
                        <div id="d1">
                          <h6>Document Type <span> :</span><span>{pro.document}</span></h6>
                        </div>
            </div>
                  <center><button type="button" className="btn btn-primary" onClick={()=>roo(pro.id,pro.document)} >Request</button></center>
                
          </div>))}

          
          <div id="fr">
            <button type="button" id="bo" onClick={ins}>
                <img src={pl} id="plo"></img></button>
          </div>
        
        </div>

        </div>)}


        { !tt && (<div className="pop" style={{background:"rgb(63, 32, 251)"}}>
          <h3 style={{color:"black"}}>Upload Your Document</h3><br></br>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">Upload a file clearly</label>
            <input className="form-control" type="file" id="formFile" onChange={(e)=>setss(e.target.files[0])} accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.rtf"></input>
        </div>
          <button type="button" className="btn btn-danger" style={{display:"inline",marginLeft:"-100px"}} onClick={() => settt(true)}>Cancel</button>
          {ss && (<button type="button" className="btn btn-success" style={{marginLeft:"100px",display:"inline",marginTop:"-38px"}} onClick={callme}> Next </button>)}
          </div>)}

          {io && (<div id="g3">
            <div id="g4">
              <div id="g5">
                        Finance Collection Model
                </div>
                <div style={{color:"black"}} id="g2">
        
        <li className="nav-item dropdown">
          <label htmlFor="em1" className="form-label"> Finance Type</label>
          <a className="nav-link dropdown-toggle" id="em1"  role="button" data-bs-toggle="dropdown" aria-expanded="false"> Select Your Option</a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" onClick={() => setftype("Daily Collection Model")}>Daily Collection Model</a></li>
            <li><a className="dropdown-item" onClick={() => setftype("Weekly Collection Model")}>Weekly Collection Model</a></li>
            <li><a className="dropdown-item" onClick={() => setftype("Long-Term Finance (Daily Interest)")}>Long-Term Finance (Daily Interest)</a></li>
            <li><a className="dropdown-item" onClick={() => setftype("Long-Term Finance (Monthly Interest)")}>Long-Term Finance (Monthly Interest)</a></li>
            <li><a className="dropdown-item" onClick={() => setftype("Monthly Return Finance (EMI Model)")}>Monthly Return Finance (EMI Model)</a></li>

          </ul>
        </li>
        </div>
        <div id="g2" style={{color:"black"}}>
          <label htmlFor="email1" className="form-label">Interest Rate</label>
            <input type="text"  id="email1"  className="form-control" aria-describedby="emailHelp" placeholder="ex:1" onChange={(event) => setitype(event.target.value)}></input>
            </div>


            <div id="g2" style={{color:"black"}}>
        
        <li className="nav-item dropdown">
          <label htmlFor="lq1" className="form-label">Duration  Type</label>
          <a className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false" id="lq1">Select Your Option</a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" onClick={() => setdu("1 Day")}>1 Day</a></li>
            <li><a className="dropdown-item" onClick={() => setdu("1 Week")}>1 Week</a></li>
            <li><a className="dropdown-item" onClick={() => setdu("100 Day")}>100 Day</a></li>
            <li><a className="dropdown-item" onClick={() => setdu("10 Week")}>10 Week</a></li>
            <li><a className="dropdown-item" onClick={() => setdu("1 Month")}>1 Month</a></li>
            <li><a className="dropdown-item" onClick={() => setdu("3 Month")}>3 Month</a></li>
            <li><a className="dropdown-item" onClick={() => setdu("6 Month")}>6 Month</a></li>
            <li><a className="dropdown-item" onClick={() => setdu("1 Year")}>1 Year</a></li>
            <li><a className="dropdown-item" onClick={() => setdu("More than 1 Year")}>More than 1 Year</a></li>
          </ul>
        </li>
        </div>
              <div id="g2" style={{color:"black"}}>
          <label htmlFor="mail1" className="form-label">Amount</label>
            <input type="text"  id="mail1"  className="form-control" aria-describedby="emailHelp"  onChange={(event) => setamt(event.target.value)}></input>
            </div>

            <div id="g2" style={{color:"black"}}>
        
        <li className="nav-item dropdown">
           <label htmlfor="mil1" className="form-label"> Document Type</label>
          <a className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false" id="mil1"> Select Your Option</a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" onClick={() => setdtype("YES")}>YES</a></li>
            <li><a className="dropdown-item" onClick={() => setdtype("NO")}>NO</a></li>
          </ul>
        </li>
        </div>
              <center style={{marginTop:"90px"}}><button type="button" className="btn btn-primary btn-lg" onClick={inpro}>Submit</button></center>
            </div>
          </div>)}
        </div>
        </>
    );
}
export default Product