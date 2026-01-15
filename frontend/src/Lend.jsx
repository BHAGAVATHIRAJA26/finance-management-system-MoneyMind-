import './index.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Lend()
{
    const navigate=useNavigate();
    const [mo,setmo]=useState();
    const {id}=useParams();
    const [rr,setrr]=useState();
    const [qp,setqp]=useState();
    const [show, setShow] = useState(false);
    const [a1,seta1]=useState();
    const [a2,seta2]=useState();
    const [a3,seta3]=useState();
    const [a4,seta4]=useState();
    const [a5,seta5]=useState(false);
    const [potp,setpotp]=useState();
    const [io,setio]=useState();
    const [pd,setpd]=useState();
    const [ot,setot]=useState();
    useEffect(()=>{
      axios.get(`http://127.0.0.1:5000/lend/${id}`)
      .then((response)=>{
        setrr(response.data.a)
        setqp(response.data.b)
      })
    },[id])
    function home()
    {
        navigate("/")
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


    function fi(){
      navigate("/interest/"+id)
    }
    function co(){
      navigate("/Contact")
    }
    function pr1(){
      navigate("/profile/"+id)
    }
    function checkotp(lvalue){
      if(parseInt(potp)===parseInt(a1+a2+a3+a4+lvalue)){
        seta5(true)
        setio(false)
      }
      else{
        setio(true)
      }
    }
     const pay=async() => {
     try {
      // 1️⃣ Create an order from Flask backend
      const response = await axios.post(`http://localhost:5000/lend/${id}`, {
        cr:2,amount: 12,ot 
      });

      const order = response.data;
      console.log("Order Data:", order);

      // 2️⃣ Razorpay options
      const options = {
        key: "rzp_test_Rav7PqqDQLc4Wd", // replace with your Razorpay Test Key ID
        amount: order.amount,
        currency: order.currency,
        name: "Payment Demo",
        description: "Person A pays Person B",
        order_id: order.id,
        prefill: {
             name: "bhagavathiraja",
             email: "bhagavathiraja.s26@gmail.com",
            contact: pd // <-- phone from your site
                },
        readonly: {
          name: true,
          email: true,
          contact: true   // 🚫 makes phone number uneditable
          },
  // 
        handler: async function (response) {
          alert("✅ Payment Successful!");

          try {
            // 3️⃣ Verify payment on backend
            const verifyRes = await axios.post(`http://localhost:5000/lend/${id}`, {cr: 3,ot,
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
      name: "ram",
      fa: "5000"});
            alert(verifyRes.data.message);
          } catch (error) {
            console.error("Verification Error:", error);
            alert("❌ Payment verification failed.");
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      // 4️⃣ Open Razorpay popup
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Order Creation Error:", error);
      alert("❌ Failed to create order. Please try again.");
    }
  };
    function frr(idd){
        console.log("aaaaaa"+idd)
        setmo(idd)
        axios.post(`http://127.0.0.1:5000/lend/${id}`,{cr:1,mo:idd})
        .then((response)=>{
          console.log(response.data.message)
          setqp(qp => qp.filter(item => item.id !== idd));
        }).catch(error=>console.error(error));
    }
    function emtr(tid){
        setot(tid)
        setShow(true)
        axios.post(`http://127.0.0.1:5000/lend/${id}`,{cr:7,tid})
        .then((response)=>{
          setpotp(response.data.checker)
          setpd("funnnnnn"+response.data.phopay)
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
            <li><a className="dropdown-item" ><button type="button" className="btn btn-outline-primary c99" onClick={fi}>Borrowed </button></a></li>
          </ul>
        </li>
        </div>
        <div id="a44"><button type="button" className="btn btn-outline-primary cc" style={{marginLeft:"40px"}} onClick={pr1}>Profile<i className="bi bi-person-circle"></i></button></div>
      </div>
        </div>
        <div>
          <b id="ab2">COLLECTION DASHBOARD</b>
          <h6 style={{paddingLeft:"30px"}}>Manage and Track all Collection of data</h6> 
        </div>
          <div id="f8">

        <span id="f7">USERNAME</span>
        <span id="f7">TOTAL AMOUNT</span>
        <span id="f7"> INTEREST (%)</span> 
        <span id="f7">DUE DATE</span>
        <span id="f7">DOCUMENT TYPE </span>
        <span id="f7" style={{marginLeft:"90px",marginRight:"90px"}}>FINANCIAL TYPE</span>
        <span id="f7">PHONE NO</span>
        <span id="f7">ACCEPTED</span>
        <span id="f7">REJECT</span>
        <span id="f7">Address</span>
        <br></br>
        <hr style={{width:"180%"}}></hr>
        <br></br>
         {qp?.map(tr=>(
          <div key={tr.id}>
        <span id="f71">{tr.bname}</span>
        <span id="f71">{tr.amount}</span>
        <span id="f71">{tr.inttype}</span> 
        <span id="f71">{tr.durtype}</span>
        <span id="f71">{tr.doctype && tr.doctype.startsWith("http") ? (
      <button type="button" className="btn btn-success cc" onClick={()=>downloadFile(tr.doctype)}>Download</button> 
  ) : (
    <span>No document </span>
  )}</span>
        <span id="f71" style={{marginLeft:"90px",marginRight:"90px"}}>{tr.fintype}</span>
        <span id="f71">{tr.bphone}</span>
        <span id="f71"><button type="button" className="btn btn-success" onClick={()=>emtr(tr.id)}>Accept</button></span>
        <span id="f71"><button type="button" className="btn btn-danger" onClick={()=>frr(tr.id)}>Reject</button></span>
        <span id="f71">{tr.baddress}</span>
        <hr style={{width:"180%"}}></hr>
        <br></br>
        </div>
        ))}
        </div>
        
        <div id="f8">

         

        <span id="f7">USERNAME</span>
        <span id="f7">TOTAL AMOUNT</span>
        <span id="f7"> INTEREST AMOUNT</span> 
        <span id="f7">PAYED DATE</span>
        <span id="f7">INTEREST RATE</span>
        <span id="f7">DUE DATE</span>
        <span id="f7">REMAINING AMOUNT</span>
        <span id="f7" style={{marginLeft:"90px",marginRight:"90px"}}>FINANCIAL TYPE</span>
        <span id="f7">AMOUNT PAYED</span>
        <span id="f7">PHONE NO</span>
        <br></br>
        <hr style={{width:"170%"}}></hr>
        <br></br>
    

  {rr?.map(pr=>(
    <div key={pr.id}>
  <span id="f71" >{pr.bname}</span>
  <span id="f71">₹{pr.tamount}</span>
  




  <span id="f71">
  {(() => {
    const principal = Number(pr.tamount);
    const rate = Number(pr.interest);
    const todaydate = new Date();
    if (pr.fintype === "Monthly Return Finance (EMI Model)") {
      const months = Number(pr.dued); // EMI months from DB
      const monthlyRate = rate / 12 / 100;

      if (months <= 0 || monthlyRate <= 0) return 0;

      const emi =
        (principal *
          monthlyRate *
          Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);

      return Math.round(emi);
    }
    /* ===============================
       Daily Collection Model
       Fixed interest (once)
    =============================== */
    if (pr.fintype === "Daily Collection Model") {
      const interestAmount = (principal * rate) / 100;
      return Math.round(interestAmount);
    }

    /* ===============================
       Weekly Collection Model
       Fixed interest (10 weeks)
    =============================== */
    if (pr.fintype === "Weekly Collection Model") {
      const interestAmount = (principal * rate) / 10;
      return Math.round(interestAmount);
    }

    /* ===============================
       Long-Term Finance (Daily Interest)
       Based on DAYS
    =============================== */
    if (pr.fintype === "Long-Term Finance (Daily Interest)") {
      const days = Math.max(
        0,
        Math.ceil(
          (todaydate - new Date(pr.payd)) / (1000 * 60 * 60 * 24)
        )
      );

      const interestAmount = (principal * rate * days) / 100;
      return Math.round(interestAmount);
    }

    /* ===============================
       Long-Term Finance (Monthly Interest)
       Based on YEARS (365 days)
    =============================== */
    if (pr.fintype === "Long-Term Finance (Monthly Interest)") {
      const years = Math.max(
        0,
        (todaydate - new Date(pr.payd)) / (1000 * 60 * 60 * 24 * 365)
      );

      const interestAmount = (principal * rate * years) / 100;
      return Math.round(interestAmount);
    }

    return 0;
  })()}
</span>

  <span id="f71">
  {new Date(pr.payd).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  })}
</span>
  <span id="f71">{pr.interest}%</span>
  <span id="f71">{new Date(pr.dued).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  })}</span>
  <span id="f71">
  {(() => {
    const principal = Number(pr.tamount);
    const rate = Number(pr.interest);
    const today = new Date();
    const payDate = new Date(pr.payd);

    let interest = 0;

    // Long-Term Daily Interest
    if (pr.fintype === "Long-Term Finance (Daily Interest)") {
      const days = Math.ceil(
        (today - payDate) / (1000 * 60 * 60 * 24)
      );
      interest = (principal * rate * days) / 100;
    }

    // Long-Term Monthly Interest
    if (pr.fintype === "Long-Term Finance (Monthly Interest)") {
      const years = Math.ceil(
        (today - payDate) / (1000 * 60 * 60 * 24 * 365)
      );
      interest = (principal * rate * years) / 100;
    }

    // Monthly & Weekly → remaining amount only
    if (
      pr.fintype === "Monthly Collection Model" ||
      pr.fintype === "Weekly Collection Model"
    ) {
      return pr.remamount;
    }

    // All other types → principal + interest
    return Math.round(principal + interest);
  })()}
</span>

  <span id="f71" style={{marginLeft:"90px",marginRight:"90px"}}>{pr.fintype}</span>


  <span id="f71">{pr.amtpay}</span>
  <span id="f71">{pr.bphone}</span>
  <br></br>
  <hr style={{width:"170%"}}></hr>
  <br></br>
  </div>
  ))}
</div>
          
  <br></br>  <br></br>  <br></br>  <br></br>
          <div>

      {show && (
        <div className="pop">
          <h6>GET A OTP FROM THE USER</h6>
          <br></br>
          <div style={{display:"inline"}}>
          <input type="text" id="il1" style={{display:"inline",width:"40px",height:"40px",marginLeft:"30px",border: "2px solid black",borderRadius: "5px"}} maxlength="1"  className="form-control" aria-describedby="emailHelp" onChange={(event)=>seta1(event.target.value)}/>
          <input type="text" style={{display:"inline",width:"40px",height:"40px",marginLeft:"20px",border: "2px solid black",borderRadius: "5px"}} min="0" max="9" maxlength="1"  className="form-control" aria-describedby="emailHelp" onChange={(event)=>seta2(event.target.value)}/>
          <input type="text" style={{display:"inline",width:"40px",height:"40px",marginLeft:"20px",border: "2px solid black",borderRadius: "5px"}} min="0" max="9" maxlength="1" className="form-control" aria-describedby="emailHelp" onChange={(event)=>seta3(event.target.value)}/>
          <input type="text" style={{display:"inline",width:"40px",height:"40px",marginLeft:"20px",border: "2px solid black",borderRadius: "5px"}} min="0" max="9" maxlength="1" className="form-control" aria-describedby="emailHelp" onChange={(event)=>seta4(event.target.value)}/>
          <input type="text" style={{display:"inline",width:"40px",height:"40px",marginLeft:"20px",border: "2px solid black",borderRadius: "5px"}} min="0" max="9" maxlength="1" className="form-control" aria-describedby="emailHelp" onChange={(event)=>checkotp(event.target.value)}/>
       </div>
       <br></br>
       <div style={{display:"inline"}}>
          <button type="button" className="btn btn-danger" style={{display:"inline"}} onClick={() => setShow(false)}>Close</button>
          {io && (<p style={{color:"red"}}>OTP is InCorrect</p>)}
          {a5 && (<button type="button" className="btn btn-success" style={{marginLeft:"100px"}} onClick={pay}> Pay </button>)}
          
      </div>
        </div>
      )}
    </div>
        </>
    )
}
export default Lend;



