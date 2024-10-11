import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

function UserWhistles() {
  // navigate for going back to homepage
  const navigate = useNavigate();

  // useState() to track the input in forms
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState("");
  const [errorCode, setErrorCode] = useState("");

  useEffect(() => {
    axios
      .get("proxy/api/v1/user/mywhistles")
      .then((res) => {
        setTickets(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setErrorCode(err.response.status);
        setError(err.message);
      });
  }, []);

  const viewTicket = (whistle_id: string) => {
    const id = whistle_id;

    // navigate("/one", { state: id });
    navigate("/view_user_whistles", { state: id });
  };
  //

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
    return <div>Loading whistles...</div>;
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
      <h1>Whistles</h1>

      <div>
        {tickets
          ? tickets.map((ticket) => (
              // present the unique key for each child in the div
              <div key={ticket._id} className="mappedPost">
                <h4>{ticket.body}</h4>
                <p>{ticket.readCount}</p>
                <Button
                  variant="outline-success"
                  className="buttonNav"
                  onClick={() => viewTicket(ticket._id)}
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

export default UserWhistles;
