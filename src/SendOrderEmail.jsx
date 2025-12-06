import React from 'react'
import emailjs from "@emailjs/browser";
import Cart from './Cart';

function SendOrderEmail({ cartItems, customerEmail, totalAmount, tax, netAmount }) {

  /* 
     FUNCTION: sendEmail()
     - Prepares email parameters
     - Sends email using EmailJS
     ============================================================ */
  const sendEmail = () => {

    /*
       These values are sent to EmailJS template
    ------------------------------------------------------------ */
    let templateParams = {
      // Convert cart items into EmailJS-friendly structure
      orders: cartItems.map(item => ({
        name: item.name,
        units: item.quantity,
        price: item.price
      })),

      order_id: Date.now(),                    // unique order ID
      totalamount: totalAmount.toFixed(2),     // total before tax/discount
      tax: tax.toFixed(2),                     // tax amount
      netamount: netAmount.toFixed(2),         // final amount
      discountamount: (totalAmount - netAmount).toFixed(2), // discount
      email: customerEmail                     // customer email
    };

    /* 
       service_id     → your EmailJS service
       template_id    → your email template
       public_key     → EmailJS public API key
    ------------------------------------------------------------ */
    emailjs.send(
      "service_20664y6",
      "template_mt4f0qk",
      templateParams,
      "EQ-Hi6MpjV9TGgZ5S"
    )
    .then((response) => {
      alert("Email sent successfully!", response.status, response.text);
    });
  };


  /* 
      UI: Button to send order email
     ============================================================ */
  return (
    <>
      
      <button onClick={sendEmail} className="send-btn">
        Send Order Email
      </button>
     
    </>
  );
}

export default SendOrderEmail;
