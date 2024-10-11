import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

function CreatorMode() {
  // navigate for going back to homepage
  const navigate = useNavigate();

  // useState() to track the input in forms
  const [events, setEvents] = useState([]);
  const [meta, setMeta] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState("");
  const [errorCode, setErrorCode] = useState("");

  useEffect(() => {
    axios
      .get("proxy/api/v1/user/profile/event_created")
      .then((res) => {
        setEvents(res.data.events);
        setMeta(res.data.total);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setErrorCode(err.response.status);
        setError(err.message);
      });
  }, []);

  const viewEvent = (event_id: string) => {
    const id = event_id;
    // console.log(id);

    navigate("/view_event_created", { state: id });
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
    <div className="createPost">
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
        onClick={() => navigate("/events")}
      >
        ALL EVENTS
      </Button>
      <Button
        variant="outline-primary"
        className="buttonNav"
        onClick={() => navigate("/profile")}
      >
        PROFILE
      </Button>
      <h1>EVENT CREATED ON EVENTFUL</h1>

      <div>{meta != null ? <p>Total: {meta}</p> : ""}</div>

      <div>
        {events
          ? events.map((event) => (
              // present the unique key for each child in the div
              <div key={event} className="mappedPost">
                <h4>{event}</h4>

                <Button
                  variant="outline-success"
                  className="buttonNav"
                  onClick={() => viewEvent(event)}
                >
                  VIEW
                </Button>
              </div>
            ))
          : ""}
      </div>

      <Button
        variant="outline-dark"
        className="buttonNav"
        onClick={() => navigate("/profile")}
      >
        BACK
      </Button>
    </div>
  );
}

export default CreatorMode;
