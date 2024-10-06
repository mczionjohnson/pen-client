import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../App.css";

function Register() {
  // navigate for going back to homepage
  const navigate = useNavigate();

  // useState() to track the input in forms
  const [post, setPost] = useState({
    username: "",
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

  // testing the useState()
  // useEffect(() => {
  //     console.log(post)
  // }, [post])

  const handleClick = async (event: { preventDefault: () => void }) => {
    // prevent it from reloading the page
    // add proxy in react package so /create can work
    // sending the post array state
    // redirecting to /create/post afterwards
    event.preventDefault();

    if (post.username == "" || post.email == "" || post.password == "") {
      return alert("Please fill in your details");
    }

    await axios
      .post("proxy/api/v1/register", post)
      .then((res) => console.log(res))
      .catch((err) => {
        console.error("Error deleting event:", err);
        setError(err.message);
      });

    navigate("/login");
  };

  if (error) {
    return <div>Error: {error}</div>; // Display the error message
  }
  return (
    <div className="createPost">
      <h1>Welcome</h1>
      <Form>
        <Form.Group>
          <div className="formInput">
            <Form.Control
              name="username"
              value={post.username}
              placeholder="Username"
              onChange={handleChange}
            />
          </div>
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
          Register
        </Button>
      </Form>
      <Button
        variant="outline-dark"
        className="buttonNav"
        onClick={() => navigate("/login")}
      >
        Do you have an account? Login here
      </Button>
    </div>
  );
}

export default Register;
