import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

import "../App.css";

// dynamic funtions
function CreatorModeView() {
  //  declare navigate function
  const navigate = useNavigate();
  const location = useLocation();

  // creating an array to store data
  const [event, setEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState("");
  const [errorCode, setErrorCode] = useState("");

  const [show, setShow] = useState(false);
  const [shareLink, setShareLink] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // getting data from backend when this page is loaded
  // getting data from backend with axios

  useEffect(() => {
    const id = location.state; // Read values passed on state

    axios
      .get(`proxy/api/v1/user/mywhistles/${id}`)
      .then((res) => {
        setEvent(res.data.singleBlog);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching event:", err);
        setErrorCode(err.response.status);
        setError(err.message);
      });
  }, []);

  // edit or delete function
  const moreActions = (_id) => {
    const id = _id;

    // axios for backend
    navigate("/view_option", { state: id });
  };

  const share = (_id) => {
    const id = _id;

    axios
      .get(`proxy/api/v1/whistles/${id}/share`)
      .then((res) => {
        setShareLink(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching whistle:", err);
        setErrorCode(err.response.status);
        setError(err.message);
      });

    // calls modal from bootstrap
    handleShow();
  };

  // const link = (link) => {
  //   const fullLink = link;

  //   window.open(fullLink, "_blank", "noreferrer");
  // };

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
    return <div>Loading events...</div>;
  }

  return (
    <div className="post-header">
      <Button
        variant="outline-info"
        className="buttonNav"
        onClick={() => navigate("/")}
      >
        HOME
      </Button>
      <Button
        variant="outline-primary"
        className="buttonNav"
        onClick={() => navigate("/profile")}
      >
        PROFILE
      </Button>
      <h1>your Whistle</h1>

      {/* modal lines are copied from react-bootstrap */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Share your event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {shareLink ? (
            <div key={shareLink.message} className="mappedPost">
              <Button
                variant="outline-success"
                className="buttonSuccess"
                onClick={() => link(shareLink.twitter)}
              >
                Twitter
              </Button>

              <Button
                variant="outline-success"
                className="buttonSuccess"
                onClick={() => link(shareLink.facebook)}
              >
                Facebook
              </Button>
              <Button
                variant="outline-success"
                className="buttonSuccess"
                onClick={() => link(shareLink.whatsapp)}
              >
                Whatsapp
              </Button>
            </div>
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/*  */}

      <div>
        {event
          ? event.map((event) => (
              // present the unique key for each child in the div
              <div key={event._id} className="mappedPost">
                <h4>{event.body}</h4>
                <p>read by {event.readCount}</p>
                <p>{event.readingTime} secs to read</p>
                <p>State: {event.state}</p>

                <div className="createBtnWrapper">
                  {/* onClick calls a function for both btn */}

                  <Button
                    variant="outline-warning"
                    className="createBtn"
                    onClick={() => share(event._id)}
                  >
                    SHARE ON SOCIAL
                  </Button>
                  <Button
                    onClick={() => moreActions(event._id)}
                    variant="outline-danger"
                    className="createBtn"
                  >
                    MORE
                  </Button>
                </div>
              </div>
            ))
          : ""}
      </div>

      <Button
        variant="outline-dark"
        className="buttonNav"
        onClick={() => navigate("/user_whistles")}
      >
        BACK
      </Button>
    </div>
  );
}

export default CreatorModeView;
