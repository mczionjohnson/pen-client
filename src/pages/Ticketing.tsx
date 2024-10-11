import { Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../App.css";

function Ticketing() {
  // navigate for going back to homepage
  const navigate = useNavigate();
  const location = useLocation();

  // useState() to track the input in forms
  const [post, setPost] = useState({
    payment: "",
    reminder: "",
  });

  const [error, setError] = useState("");
  const [errorCode, setErrorCode] = useState("");

  const handleChange = (event: {
    target: { name: unknown; value: unknown };
  }) => {
    // grab data from event.target
    // track the data with useState
    // spread the prev data before new ones
    const { name, value } = event.target;

    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleClick = async (event: { preventDefault: () => void }) => {
    // prevent it from reloading the page
    // add proxy in react package so /create can work
    // sending the post array state
    // redirecting to /create/post afterwards
    event.preventDefault();
    const id = location.state; // Read values passed on state

    await axios
      .post(`proxy/api/v1/events/${id}/attend`, post)
      .then((res) => {
        console.log(res);
        setPost(res.data.ticket);
        const ticketId = res.data.ticket;
        navigate("/user_ticket", { state: ticketId });
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setErrorCode(err.response.status);
        setError(err.message);
      });
  };

  if (errorCode == "401") {
    return (
      <div>
        <h4>Please Log in</h4>
        <>
          <Button
            variant="outline-info"
            className="buttonNav"
            onClick={() => navigate("/login")}
          >
            Go to login page
          </Button>
        </>
      </div>
    ); // Display the error message
  }
  if (error) {
    return <div>Error: {error}</div>; // Display the error message
  }

  return (
    <div className="createPost">
      <Button
        variant="outline-info"
        className="buttonNav"
        onClick={() => navigate("/whistles")}
      >
        HOME
      </Button>
      <h1>MAKE PURCHASE</h1>
      <Form>
        <Form.Group>
          <div className="formInput">
            <Form.Control
              name="payment"
              value={post.payment}
              placeholder="Payment"
              onChange={handleChange}
            />
          </div>
          <div className="formInput">
            <Form.Control
              name="reminder"
              value={post.reminder}
              placeholder="Set Reminder"
              onChange={handleChange}
            />
          </div>
        </Form.Group>
        <Button
          variant="outline-success"
          className="buttonSuccess"
          onClick={handleClick}
        >
          BUY TICKET
        </Button>
      </Form>
      <Button
        variant="outline-dark"
        className="buttonNav"
        onClick={() => navigate(-1)}
      >
        BACK
      </Button>
    </div>
  );
}

export default Ticketing;
