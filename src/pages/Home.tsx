import { useEffect, useState } from "react";
import axios from "axios";

import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Home() {
  // // navigate for going back to homepage
  const navigate = useNavigate();
  // creating an array to store data
  const [home, setHome] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState("");

  // getting data from backend when this page is loaded
  // getting data from backend with axios
  useEffect(() => {
    axios
      .get("proxy/api/v1")
      .then((res) => {
        setHome(res.data.message);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setError(err.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>; // Display the error message
  }
  if (isLoading) {
    return <div>Loading whistles...</div>;
  }

  return (
    <div className="Home">

        {home ? (
          <div className="mappedPost">
            <h1>{home}</h1>
                <Button
                  variant="outline-success"
                  className="buttonSuccess"
                  onClick={() => navigate("/register")}
                >
                  REGISTER
                </Button>
                <Button
                  variant="outline-success"
                  className="buttonSuccess"
                  onClick={() => navigate("/login")}
                >
                  LOG IN
                </Button>
              </div>
        ) : (
          ""
        )}
      </div>

  );
}

export default Home;
