import { Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

import "../App.css";

function SingleTicket() {
  // navigate for going back to homepage
  const navigate = useNavigate();
  const location = useLocation();

  // useState() to track the input in forms
  const [ticket, setTicket] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState("");
  const [errorCode, setErrorCode] = useState("");

  const [updatedTicket, setUpdatedTicket] = useState({});

  // this lines are copied from react-bootstrap
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const ticketId = location.state; // Read values passed on state

    axios
      .get(`proxy/api/v1/user/profile/tickets/${ticketId}`)
      .then((res) => {
        setTicket(res.data.ticketInfo);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setErrorCode(err.response.status);
        setError(err.message);
      });
  }, [location.state]);

  //  function to update the setUpdatedPost array with data
  const handleChange = (e: { target: { name: any; value: any } }) => {
    // deconstruct the name and value from event.target
    const { name, value } = e.target;
    setUpdatedTicket((prev) => {
      return {
        // use prev to pre filled the input fields
        ...prev,
        [name]: value,
      };
    });
  };

  const updateEvent = (ticket) => {
    // when we click on update btn, populate the setUpdatedPost with data from post
    // console.log(post);
    setUpdatedTicket(ticket);

    // calls modal from bootstrap
    handleShow();
  };

  const saveUpdatedEvent = (updatedTicket) => {
    type Org = { [key: string]: string };
    const arr: Org = {};

    arr.reminder = updatedTicket.reminder;

    // axios to connect to API
    axios
      .patch(`proxy/api/v1/user/profile/tickets/${updatedTicket._id}`, arr)
      .then((res) => console.log(res))
      .catch((err) => {
        console.error("Error updating event:", err);
        setErrorCode(err.response.status);
        setError(err.message);
      });

    // after onClick update button, the modal should close
    // the page should be reloaded
    handleClose();
    window.location.reload();
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
  if (isLoading) {
    return <div>Loading ticket...</div>;
  }

  return (
    <div className="createPost">
      <Button
        variant="outline-info"
        className="buttonNav"
        onClick={() => navigate("/")}
      >
        HOME
      </Button>

      <h1>VIEWING A TICKET</h1>
      <Button
        variant="outline-primary"
        className="buttonNav"
        onClick={() => navigate("/user_tickets")}
      >
        ALL TICKETS
      </Button>

      {/* modal lines are copied from react-bootstrap */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Reminder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <div className="mb-3 row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Reminder:
                </label>
                <div className="formInput col-sm-10">
                  <Form.Control
                    placeholder="Reminder"
                    name="reminder"
                    // check for data in updatedPost or return null
                    value={updatedTicket.reminder ? updatedTicket.reminder : ""}
                    // function to pre fill the input field
                    onChange={handleChange}
                  />
                </div>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => saveUpdatedEvent(updatedTicket)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/*  */}

      <div>
        {ticket ? (
          <div key={ticket._id} className="mappedPost">
            <h4>{ticket.title}</h4>
            <p>{ticket.location}</p>
            <p>{ticket.eventDate}</p>
            <p>
              <span>QR CODE:</span> {ticket.cloud}
            </p>
            <p>Reminder: {ticket.reminder}</p>
            <div className="createBtnWrapper">
              {/* onClick calls a function for both btn */}
              <Button
                onClick={() => updateEvent(ticket)}
                variant="outline-success"
                className="createBtn"
              >
                UPDATE REMINDER FOR THIS EVENT
              </Button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      <Button
        variant="outline-dark"
        className="buttonNav"
        onClick={() => navigate("/user_tickets")}
      >
        BACK
      </Button>
    </div>
  );
}

export default SingleTicket;
