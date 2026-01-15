import { useState } from "react";

export default function PaymentPage() {
  const [qr, setQr] = useState(null);
  const [upiLink, setUpiLink] = useState("");

  const startPayment = async () => {
    const res = await fetch("http://localhost:5000/pay");
    const data = await res.json();
    setQr(data.qr);
    setUpiLink(data.upi_link);
  };

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>Pay Using UPI (Website)</h2>

      <button 
        onClick={startPayment}
        style={{
          padding: "10px 20px",
          background: "blue",
          color: "white",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Generate Payment
      </button>

      {qr && (
        <div>
          <h3>Scan to Pay</h3>
          <img
            src={`data:image/png;base64,${qr}`}
            alt="UPI QR"
            style={{ width: "240px", height: "240px" }}
          />

          <br /><br />

          {/* Mobile-only clickable UPI link */}
          <a
            href={upiLink}
            style={{
              display: "inline-block",
              padding: "10px",
              background: "green",
              color: "white",
              textDecoration: "none",
              borderRadius: "5px",
            }}
          >
            Click to Pay (Mobile Only)
          </a>
        </div>
      )}
    </div>
  );
}
