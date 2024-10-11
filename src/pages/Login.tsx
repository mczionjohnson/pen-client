import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../App.css";

function Login() {
  // navigate for going back to homepage
  const navigate = useNavigate();

  // useState() to track the input in forms
  const [post, setPost] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

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

    if (post.email == "" || post.password == "") {
      return alert("Please fill in your details");
    }

    await axios
      .post("proxy/api/v1/login", post)
      .then((res) => {
        console.log(res.status), navigate("/");
      })
      .catch((err) => {
        console.error("Error fetching event:", err);
        setError(err.message);
      });

  };

  if (error) {
    return <div>Error: {error}</div>; // Display the error message
  }

  return (
    <div className="createPost">
      <h1>Welcome back</h1>
      <Form>
        <Form.Group>
          <div className="formInput">
            <Form.Control
              name="email"
              value={post.email}
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
          <div className="formInput">
            <Form.Control
              name="password"
              value={post.password}
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
        </Form.Group>
        <Button
          variant="outline-success"
          className="buttonSuccess"
          onClick={handleClick}
        >
          Ok, go
        </Button>
      </Form>
      <Button
        variant="outline-dark"
        className="buttonNav"
        onClick={() => navigate("/register")}
      >
        Register here
      </Button>
    </div>
  );
}

export default Login;
