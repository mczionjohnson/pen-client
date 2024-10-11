import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

import "../App.css";

// dynamic funtions
function CreatorModeViewMore() {
  //  declare navigate function
  const navigate = useNavigate();
  const location = useLocation();

  // creating an array to store data
  const [event, setEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState("");
  const [errorCode, setErrorCode] = useState("");

  const [updatedEvent, setUpdatedEvent] = useState({});
  const [updatedState, setUpdatedState] = useState("");

  // this lines are copied from react-bootstrap
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

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

  const updateEvent = (event) => {
    // when we click on update btn, populate the setUpdatedPost with data from post
    // console.log(post);
    setUpdatedEvent(event);

    // calls modal from bootstrap
    handleShow();
  };

  const deleteModal = (event) => {
    // calls modal from bootstrap
    handleShow2();
  };

  //  function to update the setUpdatedPost array with data
  const handleChange = (e: { target: { name: any; value: any } }) => {
    // deconstruct the name and value from event.target
    const { name, value } = e.target;
    setUpdatedEvent((prev) => {
      return {
        // use prev to pre filled the input fields
        ...prev,
        [name]: value,
      };
    });
  };

  const publish = () => {
    setUpdatedState("published");
  };

  const saveUpdatedEvent = (updatedEvent) => {
    type Org = { [key: string]: string };
    const arr: Org = {};

    arr.body = updatedEvent.body;
    arr.state = updatedState;

    // axios to connect to API
    axios
      .patch(`proxy/api/v1/user/mywhistles/${updatedEvent._id}`, arr)
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

  // delete function
  const deleteEvent = (_id) => {
    const id = _id;
    // console.log(id);
    // axios for backend
    axios
      .delete(`proxy/api/v1/user/mywhistles/${id}`)
      .then(() => {
        navigate("/user_whistles");
      })
      .catch((err) => {
        console.error("Error deleting event:", err);
        setErrorCode(err.response.status);
        setError(err.message);
      });

    // handleClose();
  };

  const goBack = () => {
    const id = location.state; // Read values passed on state

    // const id = whistle_id;

    navigate("/view_user_whistles", { state: id });
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
      <h1>more for you</h1>

      {/* modal lines are copied from react-bootstrap */}
      {/* for update modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update a whistle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <div className="mb-3 row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Body:
                </label>
                <div className="formInput col-sm-10">
                  <Form.Control
                    placeholder="body"
                    name="body"
                    // check for data in updatedPost or return null
                    value={updatedEvent.body ? updatedEvent.body : ""}
                    // function to pre fill the input field
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Read by:
                </label>
                <div className="formInput col-sm-10">
                  <Form.Control
                    placeholder="0"
                    name="readCount"
                    readOnly
                    className="form-control-plaintext"
                    // check for data in updatedPost or return null
                    value={updatedEvent.readCount ? updatedEvent.readCount : ""}
                  />
                </div>
              </div>

              {updatedEvent.state == "draft" ? (
                <div className="mb-3 row">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-2 col-form-label"
                  >
                    State:
                  </label>
                  <div className="formInput col-sm-10">
                    <Form.Check 
                      type="switch"
                      id="custom-switch"
                      label="post this whistle"
                      onChange={publish}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => saveUpdatedEvent(updatedEvent)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/*  */}

      {/* modal lines are copied from react-bootstrap */}
      {/* for delete modal */}
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body>This action cannot be reversed</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => deleteEvent(event._id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/*  */}

      <div>
        {event
          ? event.map((event) => (
              <div key={event._id} className="mappedPost">
                <h4>{event.body}</h4>
                <p>read by {event.readCount}</p>
                <p>{event.readingTime} secs to read</p>
                <p>State: {event.state}</p>

                <div className="createBtnWrapper">
                  {/* onClick calls a function for both btn */}
                  <Button
                    onClick={() => updateEvent(event)}
                    variant="outline-success"
                    className="createBtn"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteModal(event)}
                    variant="outline-danger"
                    className="createBtn"
                  >
                    delete
                  </Button>
                </div>
              </div>
            ))
          : ""}
      </div>

      <Button
        variant="outline-dark"
        className="buttonNav"
        onClick={() => goBack()}
      >
        BACK
      </Button>
    </div>
  );
}

export default CreatorModeViewMore;
