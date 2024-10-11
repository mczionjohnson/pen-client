import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../App.css";

function CreateEvent() {
  // navigate for going back to homepage
  const navigate = useNavigate();

  // useState() to track the input in forms
  const [post, setPost] = useState({
    title: "",
    host: "",
    description: "",
    tags: "",
    location: "",
    ticketPrice: "",
    rsvp: "",
    eventDate: "",
    eventTime: "",
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

    await axios
      .post("proxy/api/v1/events/create", post)
      .then((res) => {
        setPost(res.data.event);
        const id = res.data.event._id;

        navigate("/view_event_created", { state: id });
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
      <h1>Create a Post</h1>
      <Form>
        <Form.Group>
          <div className="formInput">
            <Form.Control
              name="title"
              value={post.title}
              placeholder="Title"
              onChange={handleChange}
            />
          </div>
          <div className="formInput">
            <Form.Control
              name="host"
              value={post.host}
              placeholder="Host"
              onChange={handleChange}
            />
          </div>
          <div className="formInput">
            <Form.Control
              name="description"
              value={post.description}
              placeholder="Description"
              onChange={handleChange}
            />
          </div>
          <div className="formInput">
            <Form.Control
              name="tags"
              value={post.tags}
              placeholder="Tags"
              onChange={handleChange}
            />
          </div>
          <div className="formInput">
            <Form.Control
              name="location"
              value={post.location}
              placeholder="location"
              onChange={handleChange}
            />
          </div>
          <div className="formInput">
            <Form.Control
              name="ticketPrice"
              value={post.ticketPrice}
              placeholder="TicketPrice"
              onChange={handleChange}
            />
          </div>
          <div className="formInput">
            <Form.Control
              name="rsvp"
              value={post.rsvp}
              placeholder="RSVP"
              onChange={handleChange}
            />
          </div>
          <div className="formInput">
            <Form.Control
              name="eventDate"
              value={post.eventDate}
              placeholder="Event Date"
              onChange={handleChange}
            />
          </div>
          <div className="formInput">
            <Form.Control
              name="eventTime"
              value={post.eventTime}
              placeholder="Event Time"
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
          CREATE EVENT
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

export default CreateEvent;
