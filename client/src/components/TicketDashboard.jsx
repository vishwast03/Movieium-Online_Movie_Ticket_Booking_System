import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";

const TicketDashboard = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState({
    movie: "",
    date: "",
    seats: "",
    ticket_price: "",
  });

  const fetchShowDetails = async () => {
    const response = await fetch(`${props.host}/api/movies/getshowdetails`, {
      method: "POST",
      body: JSON.stringify({ showId: params.showId }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const jsonResponse = await response.json();

    setShow(jsonResponse);
  };

  const formatDateTime = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dateObj = new Date(date);

    const formattedString = `${dateObj.getDate()} ${
      months[dateObj.getMonth()]
    } / ${dateObj.getHours()}:${
      dateObj.getMinutes() < 10
        ? "0" + dateObj.getMinutes()
        : dateObj.getMinutes()
    }`;

    return formattedString;
  };

  useEffect(() => {
    if (!props.user.isLoggedIn) {
      navigate("/login");
    }
    fetchShowDetails();
  }, []);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // creating a new order
    const result = await axios.post(`${props.host}/api/payment/orders`, {
      amount: show.ticket_price,
    });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_9gPJYdPeuyxhJD",
      amount: amount.toString(),
      currency: currency,
      name: props.user.name,
      description: `Ticket - ${show.movie}`,
      image: { logo },
      order_id: order_id,
      handler: async (response) => {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          show_id: show._id,
          user_id: props.user._id,
          movie: show.movie,
          show_date: show.date,
        };

        const result = await axios.post(
          `${props.host}/api/payment/success`,
          data
        );

        if (result.data.msg === "success") {
          props.showAlert("Ticket Ordered Successfully", "success");
          navigate("/");
        }
      },
      prefill: {
        name: props.user.name,
        email: props.user.email,
        contact: props.user.phone_no,
      },
      theme: {
        color: "#2d4263",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div id="ticket-dashboard">
      <h2>Get Ticket</h2>
      <div id="show-details">
        <div>
          Movie: <span>{show.movie}</span>
        </div>
        <div>
          Date: <span>{show.date && formatDateTime(show.date)}</span>
        </div>
        <div>
          Available Seats: <span>{show.seats}</span>
        </div>
        <div>
          Price: &#8377;<span>{show.ticket_price}</span>
        </div>
        <button id="pay-btn" onClick={displayRazorpay}>
          {`Pay ₹${show.ticket_price}`}
        </button>
      </div>
    </div>
  );
};

export default TicketDashboard;
