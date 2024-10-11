import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

function UserEventAttended() {
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
      .get("proxy/api/v1/user/profile/event_attended")
      .then((res) => {
        setEvents(res.data.eventAttended);
        setMeta(res.data.total);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setErrorCode(err.response.status);
        setError(err.message);
      });
  }, []);

  const viewTicket = (ticket: string) => {
    const id = ticket;
    // console.log(id);

    navigate("/user_ticket", { state: id });
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
    return <div>Loading tickets...</div>;
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
        onClick={() => navigate("/profile")}
      >
        PROFILE
      </Button>
      <h1>EVENT ATTENDED ON EVENTFUL</h1>

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
                  onClick={() => viewTicket(event)}
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
        onClick={() => navigate(-1)}
      >
        BACK
      </Button>
    </div>
  );
}

export default UserEventAttended;
