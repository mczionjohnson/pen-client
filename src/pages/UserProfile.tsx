import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

function UserProfile() {
  // navigate for going back to homepage
  const navigate = useNavigate();

  // useState() to track the input in forms
  const [profile, setProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState("");
  const [errorCode, setErrorCode] = useState("");

  useEffect(() => {
    axios
      .get("proxy/api/v1/user/profile")
      .then((res) => {
        setProfile(res.data.userProfile);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setErrorCode(err.response.status);
        setError(err.message);
      });
  }, []);

  const logoutUser = async (event: { preventDefault: () => void }) => {
    // prevent it from reloading the page
    // add proxy in react package so /create can work
    // sending the post array state
    // redirecting to /create/post afterwards
    event.preventDefault();

    await axios
      .get("proxy/api/v1/logout")
      .then((res) => console.log(res))
      .catch((err) => {
        console.error("Error logging out:", err);
        setErrorCode(err.response.status);
        setError(err.message);
      });

    navigate("/login");
  };

  if (errorCode == "401") {
    return (
      <div>
        <h4>Please Log in</h4>
        <>
          <Button
            variant="outline-info"
            className="buttonNav"
            onClick={() => navigate("/whistles")}
          >
           HOME
          </Button>
        </>
      </div>
    ); // Display the error message
  }
  if (error) {
    return <div>Error: {error}</div>; // Display the error message
  }
  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="createPost">
      {/* <Button
        variant="outline-info"
        className="buttonNav"
        onClick={() => navigate("/whistles")}
      >
        HOME
      </Button> */}
      <Button
        variant="outline-primary"
        className="buttonNav"
        onClick={() => navigate("/whistles")}
      >
        Home
      </Button>

      <h1>PROFILE</h1>

      <div>
        {profile ? (
          <div key={profile.email} className="mappedPost">
            <h4>{profile.username}</h4>
            <p>{profile.email}</p>

            <p>
              <span>Ticket(s) bought on Eventful:</span>{" "}
              {profile.eventTickets.length}
            </p>

            <Button
              variant="outline-success"
              className="buttonNav"
              onClick={() => navigate("/user_tickets")}
            >
              VIEW TICKETS
            </Button>

            <p>
              <span>Event(s) Attended:</span> {profile.eventAttended.length}
            </p>
            <Button
              variant="outline-success"
              className="buttonNav"
              onClick={() => navigate("/event_attended")}
            >
              VIEW EVENTS ATTENDED
            </Button>
            <p>
              <span>Event(s) created on Eventful:</span>{" "}
              {profile.eventCreated.length}
            </p>
            <Button
              variant="outline-success"
              className="buttonNav"
              onClick={() => navigate("/event_created")}
            >
              VIEW YOUR EVENTS
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>

      <Button
        variant="outline-dark"
        className="buttonNav"
        onClick={() => navigate(-1)}
      >
        BACK
      </Button>

      <Button variant="outline-danger" className="buttonNav" onClick={logoutUser}>
        LOG OUT
      </Button>
    </div>
  );
}

export default UserProfile;
