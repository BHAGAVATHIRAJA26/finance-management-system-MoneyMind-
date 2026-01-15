import './index.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
function Interest()
{   
    const {id}=useParams();
    const navigate=useNavigate();
    const [pp1,setpp1]=useState(false);
    const [ib,setib]=useState();
    const [mo,setmo]=useState();
    const [a1,seta1]=useState();
    const [a2,seta2]=useState();
    const [a3,seta3]=useState();
    const [a4,seta4]=useState();
    const [pi,setpi]=useState();
    const [oin,setoin]=useState();
    const [sn, setsn] = useState(false);
    const [win,setwin]=useState(true);
    const [bid,setbid]=useState(false);
    const [qr, setQr] = useState(null);
    const [Amount, setAmount] = useState();
    const [type,settype]=useState();

    useEffect(()=>{
      axios.get(`http://127.0.0.1:5000/interest/${id}`)
        .then((response)=>{
        setib(response.data);
        console.log(mo);
        })
        .catch(error=>console.error(error));
    },[id]);

    function checkotp(event){
      
        if(parseInt(a1+a2+a3+a4+event)===oin){
          setbid(true)
          setoin(null)
        }
        else{
          alert("invalid OTP")
        }
    }
    function uuu(){
      alert("✅ payment detail verified")
      setbid(false)
      setQr(false)


      axios.post(`http://127.0.0.1:5000/sucpayment`,{type,win,Amount})
  .then((response)=>{
    console.log(response.data.message)})
    
    }
    function fi112(){
      setpp1(false)
    }
    function fas(idd){
      console.log("aaaaaa"+idd)
      setmo(idd)
        axios.post(`http://127.0.0.1:5000/interest/${id}`,{mo:idd})
        .then((response)=>{
          console.log(response.data.message)
          setib(ib => ib.filter(item => item.id !== idd));
        }).catch(error=>console.error(error));
    }
    function home()
    {
        navigate("/")
    }
    function co(){
        navigate("/Contact")
    }
    function fi11(){
      navigate("/lend/"+id)
    }
    function pr1(){
      navigate("/profile/"+id)
    }

    function otpgen(){
      setsn(true)
      axios.post(`http://127.0.0.1:5000/otpver`,{win})
  .then((response)=>{
    setoin(response.data.message)
    
    console.log(response.data.message)})
    }
    
    
 
function generateQR(amount,id,t) 
 {
   setwin(id)
   settype(t)
  
    setAmount(amount)
  fetch("http://127.0.0.1:5000/generate-qr",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount,id}),
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Failed to generate QR");
      }
      return res.json();
    })
    .then(data => {
      setQr(data.qr);   
      
    })
    .catch(err => console.error(err));
}
    function downloadFile(url) {
   console.log("urlllllll"+url)
   fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = 'image.jpg'; // default name
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    })
    .catch(err => console.error('Download failed:', err));
}


function maind(){
  setpp1(true)
  axios.post(`http://127.0.0.1:5000/colmod/${id}`)
  .then((response)=>{
    console.log(response.data.message)
    setpi(response.data.message)
  })
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
            <li><a className="dropdown-item" ><button type="button" className="btn btn-outline-primary c99" onClick={fi11}>Lend </button></a></li>

          </ul>
        </li>
          </div>
           <div id="a44"><button type="button" className="btn btn-outline-primary cc" style={{marginLeft:"40px"}} onClick={pr1}>Profile<i className="bi bi-person-circle"></i></button></div>

      </div>
      <br></br> 
          {!pp1 && (
            
        <div>
          <div id="pop">
          {ib?.map(ro=>(
      
      <div id="c0">  
            <div id="c1t">
            <div id="c5" style={{display:"inline-block",paddingRight:"200px"}} key={ro.id}>{ro.lname}</div>
            <h6 style={{display:"inline-block"}}>Phone no: {ro.lmobile}</h6>
            <h6 >{ro.laddress}</h6>
            </div>
            <h6 id="c6">Finance Amount : ₹ {ro.amount}</h6>

            <br></br>
             <hr></hr>
         
            <div id="oio">
                        <div id="d1">
                          <h6>Finance Type:</h6>
                          
                          <h6>{ro.fintype}</h6>
                          
                        </div>
                        <div id="d1">
                          <h6>Interest(%) <span> :</span><span> {ro.inttype}%</span></h6>
                        </div>
            </div>
            <hr></hr>
            <div id="oio">
                        <div id="d1">
                          <h6>Duration Type:</h6>
                          <h6>{ro.durtype}</h6>
                          
                        </div>
                        <div id="d1">
                          <h6>Document Type <span> :</span>
                          {ro.doctype==='NO' ?(
                          <span> {ro.doctype}</span>):
                            (<span style={{color:"blue",cursor:"pointer"}} onClick={()=>downloadFile(ro.doctype)}> YES</span>)
                        }</h6>
                        </div>
            </div>
                  <button  className="btn btn-success" style={{marginLeft:"180px"}}>Asking...!!!</button>
                  <button type="button" className="btn btn-danger" style={{marginLeft:"180px"}} onClick={()=>fas(ro.id)}>Removed</button>
                
          </div>

          ))}</div>
          <center><button type="button" className="btn btn-secondary" onClick={maind}>Click Me to view Your Finance</button></center>
        </div>
      )}
        </div>


{pp1 &&
        (<div>
          {pi?.map((te1)=>(
          <div key={te1.id}>
          <br></br>
          { te1.fintype==='Daily Collection Model' ? (
          <div id="uuu">
          
              <div id="c1t">
                  <div id="c5">{te1.lname}</div>
                  <h6>{te1.laddress}</h6>
              </div>
              <br></br>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
  <span id="d1">Total Amount: <b>{te1.tamount}</b></span>
  <span id="d1">Paid Amount: <b>{te1.amtpay}</b></span>
  <span id="d1">Interest: <b>{te1.interest}%</b></span>
</div>

<hr />

{/* NEW ROW 2 (Swapped Row) */}
<div style={{ display: "flex", justifyContent: "space-between", margin: "15px 0" }}>
  <span id="d1">
    Due Date:{" "}
    <b>
      {new Date(te1.dued).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      })}
    </b>
  </span>

  <span id="d1">Remaining Amount: <b>{te1.remamount}</b></span>

  <span id="d1">
    
      
  Remaining Days:{" "}
  <b style={{color:"red"}}>
    {(() => {
  const days = Math.ceil(
    (new Date(te1.dued) - new Date()) / (1000 * 60 * 60 * 24)
  );
  return days > 0 ? `${days} days` : "Expired";
})()}
    
  </b>

  </span>
</div>
              <hr></hr>
              <div style={{ display: "flex", justifyContent: "space-between", margin: "15px 0" }}>
  <span id="d1">Type: <b>{te1.fintype}</b></span>

  <span id="d1">
    Borrowed Date:{" "}
    <b>
      {new Date(te1.payd).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      })}
    </b>
  </span>
</div>
              <div>
              <div id="pop">
  {(() => {
    // BASIC VALUES
    const totalAmount = Number(te1.tamount);   // 123
    const paidAmount = Number(te1.amtpay);     // 5000
    const interestPercent = te1.interest;               // from DB
    const totalDays = 100;

    // INTEREST CALCULATION
    const interestAmount = (totalAmount * interestPercent) / 100;

    // TOTAL PAYABLE
    const totalPayableAmount = totalAmount + interestAmount;

    // DAILY COLLECTION
    const dailyAmount = totalPayableAmount / totalDays;

    // PAID DAYS (IMPORTANT FIX)
    let paidDays = Math.floor(paidAmount / dailyAmount);

    // NEVER ALLOW PAID DAYS > TOTAL DAYS
    if (paidDays > totalDays) {
      paidDays = totalDays;
    }

    const unpaidDays = totalDays - paidDays;

    return (
      <>
        {/* PAID DAYS */}
        {Array.from({ length: paidDays }).map((_, i) => (
          <div id="rrr" key={`paid-${i}`}>
            <span id="d13">{i + 1} Day</span>
            <button
              className="btn btn-primary"
              style={{ marginLeft: "140px" }}
              disabled
            >
              Paid
            </button>
          </div>
        ))}

        {/* UNPAID DAYS */}
        {Array.from({ length: unpaidDays }).map((_, i) => (
          <div id="rrr" key={`unpaid-${i}`}>
            <span id="d13">{paidDays + i + 1} Day</span>
            <button onClick={() => generateQR(dailyAmount.toFixed(2),te1.id,100)}
              className="btn btn-success"
              style={{ marginLeft: "140px" }}
            >
              Pay
            </button>
          </div>
        ))}
      </>
    );
  })()}
</div>
          </div>
          </div>):null}
          <br></br></div>))}
          
                
                {pi?.map((te1)=>(
          <div key={te1.id}>
          <br></br>
          { te1.fintype==='Weekly Collection Model' ? (
          <div id="uuu">
          
              <div id="c1t">
                  <div id="c5">{te1.lname}</div>
                  <h6>{te1.laddress}</h6>
              </div>
              
              <br />

                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
  <span id="d1">Total Amount: <b>{te1.tamount}</b></span>
  <span id="d1">Paid Amount: <b>{te1.amtpay}</b></span>
  <span id="d1">Interest: <b>{te1.interest}%</b></span>
</div>

<hr />

{/* NEW ROW 2 (Swapped Row) */}
<div style={{ display: "flex", justifyContent: "space-between", margin: "15px 0" }}>
  <span id="d1">
    Due Date:{" "}
    <b>
      {new Date(te1.dued).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      })}
    </b>
  </span>

  <span id="d1">Remaining Amount: <b>{te1.remamount}</b></span>

  <span id="d1">
    Remaining Days:
    <b style={{color:"red"}}>
    {(() => {
  const days = Math.ceil(
    (new Date(te1.dued) - new Date()) / (1000 * 60 * 60 * 24)
  );
  return days > 0 ? `${days} days` : "Expired";
})()}
    
  </b>
  </span>
</div>

<hr />

{/* NEW ROW 3 */}
<div style={{ display: "flex", justifyContent: "space-between", margin: "15px 0" }}>
  <span id="d1">Type: <b>{te1.fintype}</b></span>

  <span id="d1">
    Borrowed Date:{" "}
    <b>
      {new Date(te1.payd).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      })}
    </b>
  </span>
</div>

              
              
              <div>
              <div id="pop">
  {(() => {
    // BASIC VALUES
    const totalAmount = Number(te1.tamount);   // 123
    const paidAmount = Number(te1.amtpay);     // 5000
    const interestPercent =  te1.interest;              // from DB
    const totalDays = 10;

    // INTEREST CALCULATION
    const interestAmount = (totalAmount * interestPercent) / 100;

    // TOTAL PAYABLE
    const totalPayableAmount = totalAmount + interestAmount;

    // DAILY COLLECTION
    const dailyAmount = totalPayableAmount / totalDays;

    // PAID DAYS (IMPORTANT FIX)
    let paidDays = Math.floor(paidAmount / dailyAmount);

    // NEVER ALLOW PAID DAYS > TOTAL DAYS
    if (paidDays > totalDays) {
      paidDays = totalDays;
    }

    const unpaidDays = totalDays - paidDays;

    return (
      <>
        {/* PAID DAYS */}
        {Array.from({ length: paidDays }).map((_, i) => (
          <div id="rrr" key={`paid-${i}`}>
            <span id="d13">{i + 1} Week</span>
            <button
              className="btn btn-primary"
              style={{ marginLeft: "140px" }}
              disabled
            >
              Paid
            </button>
          </div>
        ))}

        {/* UNPAID DAYS */}
        {Array.from({ length: unpaidDays }).map((_, i) => (
          <div id="rrr" key={`unpaid-${i}`}>
            <span id="d13">{paidDays + i + 1} Week</span>
            <button onClick={() => generateQR(dailyAmount.toFixed(2),te1.id,100)}
              className="btn btn-success"
              style={{ marginLeft: "140px" }}
            >
              Pay
            </button>
          </div>
        ))}
      </>
    );
  })()}
</div>
          </div>
          </div>):null}
          </div>))}
                
          <div id="pop" style={{
  marginLeft:"-100px",
  gap:"-200px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
}}
>
          { pi?.map(te=>(


      <div style={{paddingLeft:"100px"}}>{ te.fintype==='Long-Term Finance (Daily Interest)' && (
      
      <div id="c0" style={{height:"550px"}}>  
      
    {(() => {
      const principal = Number(te.tamount);
      const rate = Number(te.interest);

      const days = Math.max(
        0,
        Math.ceil(
          (new Date() - new Date(te.payd)) / (1000 * 60 * 60 * 24)
        )
      );

      const interest = Math.round((principal * rate * days) / 100);
 return (
   <>
  
            <div id="c1t">
            <div id="c5">{te.lname}</div>
            <h6>{te.laddress}</h6>
            </div>
            <div>
            <h6 id="c16">Finance Amount : ₹ {te.tamount}</h6> <h6 id="c16" style={{paddingLeft:"180px"}}>Due Date:{new Date(te.dued).toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric"
})}
</h6>
            </div>

            <br></br>
             <hr></hr>
            <div id="oio">
                        <div id="d1">
                          <h6>Finance Type:</h6>
                          <h6> {te.fintype}</h6>
                          
                        </div>
                        <div id="d1">
                          <h6>Interest(%) <span> :</span><span> {te.interest}%</span></h6>
                        </div>
            </div>
            <hr></hr>
            <div id="oio">
                        <div id="d1">
                          <h6>Borrowed date</h6>
                          <h6>
                            {new Date(te.payd).toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric"
})}
                          </h6>
                          
                        </div>
                        <div id="d1">
                       
                       <h6>Remaining Days <span> :</span><span style={{color:"red"}}>{(() => {
  const days = Math.ceil(
    (new Date(te.dued) - new Date()) / (1000 * 60 * 60 * 24)
  );
  return days > 0 ? `${days} days` : "Expired";
})()}
</span></h6>
                        </div>
            </div>
            <hr></hr>
            <div id="oio">
                        <div id="d1">
                          <h6>Interest Amount <span> :</span><span>{interest}</span></h6>
                        
                          
                        </div>
                        <div id="d1">
                       
                       <h6>Total Amount<span> :</span><span>{te.tamount+interest}</span></h6>
                        </div>
            </div>
            <hr></hr>
                  <button  className="btn btn-success" style={{marginLeft:"120px"}} onClick={() => generateQR(interest,te.id,1)}>Pay Interest</button>
                  <button type="button" className="btn btn-danger" style={{marginLeft:"220px"}} onClick={() => generateQR(te.tamount+interest,te.id,12)}>Pay Total Amount</button>
              </>
          );
          })()}
          </div>
          )}
          </div>))}
         
          { pi?.map(te=>(


      <div>{ te.fintype!=='Daily Collection Model' && te.fintype!=='Weekly Collection Model' && te.fintype!=='Long-Term Finance (Daily Interest)'? (
      
      <div id="c0" style={{height:"550px"}}>  
      
    {(() => {
      const principal = Number(te.tamount);
      const rate = Number(te.interest);

      const days = Math.max(
        0,
        Math.ceil(
          (new Date() - new Date(te.payd)) / (1000 * 60 * 60 * 24*365)
        )
      );

      const interest = Math.round((principal * rate * days) / 100);
 return (
   <>
  
            <div id="c1t">
            <div id="c5">{te.lname}</div>
            <h6>{te.laddress}</h6>
            </div>
            <div>
            <h6 id="c16">Finance Amount : ₹ {te.tamount}</h6> <h6 id="c16" style={{paddingLeft:"180px"}}>Due Date:{new Date(te.dued).toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric"
})}
</h6>
            </div>

            <br></br>
             <hr></hr>
            <div id="oio">
                        <div id="d1">
                          <h6>Finance Type:</h6>
                          <h6> {te.fintype}</h6>
                          
                        </div>
                        <div id="d1">
                          <h6>Interest(%) <span> :</span><span> {te.interest}%</span></h6>
                        </div>
            </div>
            <hr></hr>
            <div id="oio">
                        <div id="d1">
                          <h6>Borrowed date</h6>
                          <h6>
                            {new Date(te.payd).toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric"
})}
                          </h6>
                          
                        </div>
                        <div id="d1">
                       
                       <h6>Remaining Days <span> :</span><span style={{color:"red"}}>{(() => {
  const days = Math.ceil(
    (new Date(te.dued
      
    ) - new Date()) / (1000 * 60 * 60 * 24)
  );
  return days > 0 ? `${days} days` : "Expired";
})()}
</span></h6>
                        </div>
            </div>
            <hr></hr>
            <div id="oio">
                        <div id="d1">
                          <h6>Interest Amount <span> :</span><span>{interest}</span></h6>
                        
                          
                        </div>
                        <div id="d1">
                       
                       <h6>Total Amount<span> :</span><span>{te.tamount+interest}</span></h6>
                        </div>
            </div>
            <hr></hr>
                  <button  className="btn btn-success" style={{marginLeft:"120px"}} onClick={() => generateQR(interest,te.id,1)}>Pay Interest</button>
                  <button type="button" className="btn btn-danger" style={{marginLeft:"220px"}} onClick={() => generateQR(te.tamount+interest,te.id,12)}>Pay Total Amount</button>
              </>
          );
          })()}
          </div>
          ):null}
          </div>))}
          </div>



            










          <center><button type="button" className="btn btn-secondary" onClick={fi112}>Back</button></center>

          {qr && (
  <div className="pop" style={{ textAlign: "center", marginTop: "20px" , width:"600px" ,height:"600px"}}>
    <h4>Scan & Pay</h4>
    <img
      style={{paddingLeft:"30px"}}
      src={`data:image/png;base64,${qr}`}
      alt="UPI QR"
      width="250"
    />
    {!sn &&(<div>
      <p style={{ color: "red" }}>
      ⚠️ After payment, Enter a OTP
    </p>
    
    <button type="button" className="btn btn-primary btn-outline-dark" onClick={() => otpgen()}>Generate OTP</button>
    </div>
    )}
    {sn &&(<div>
    <div style={{display:"inline"}}>
          <input type="text" id="il1" style={{display:"inline",width:"40px",height:"40px",marginLeft:"30px",border: "2px solid black",borderRadius: "5px"}} maxlength="1"  className="form-control" aria-describedby="emailHelp" onChange={(event)=>seta1(event.target.value)}/>
          <input type="text" style={{display:"inline",width:"40px",height:"40px",marginLeft:"20px",border: "2px solid black",borderRadius: "5px"}} min="0" max="9" maxlength="1"  className="form-control" aria-describedby="emailHelp" onChange={(event)=>seta2(event.target.value)}/>
          <input type="text" style={{display:"inline",width:"40px",height:"40px",marginLeft:"20px",border: "2px solid black",borderRadius: "5px"}} min="0" max="9" maxlength="1" className="form-control" aria-describedby="emailHelp" onChange={(event)=>seta3(event.target.value)}/>
          <input type="text" style={{display:"inline",width:"40px",height:"40px",marginLeft:"20px",border: "2px solid black",borderRadius: "5px"}} min="0" max="9" maxlength="1" className="form-control" aria-describedby="emailHelp" onChange={(event)=>seta4(event.target.value)}/>
          <input type="text" style={{display:"inline",width:"40px",height:"40px",marginLeft:"20px",border: "2px solid black",borderRadius: "5px"}} min="0" max="9" maxlength="1" className="form-control" aria-describedby="emailHelp" onChange={(event)=>checkotp(event.target.value)}/>
       </div>
       <br></br><br></br>
       {bid && (<button type="button" className="btn btn-primary btn-outline-dark" onClick={uuu}>Submit</button>)}
    </div>)}

    <button type="button" style={{marginTop:"100px"}}className="btn btn-danger btn-outline-dark" onClick={() => setQr(null)}>Back</button>
  </div>
)}

        </div>
        )
      }
        </>
    );
  }

export default Interest