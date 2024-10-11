import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

import "../App.css";

// dynamic funtions
function OneWhistle() {
  //  declare navigate function
  const navigate = useNavigate();
  const location = useLocation();

  // creating an array to store data
  const [blogs, setBlogs] = useState([]);
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
      // .get("proxy/api/v1/whistles/")
      .get(`proxy/api/v1/whistles/${id}`)
      .then((res) => {
        setBlogs(res.data.singleWhistle);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setErrorCode(err.response.status);
        setError(err.message);
      });
  }, []);

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

  const link = (link) => {
    const fullLink = link;

    window.open(fullLink, "_blank", "noreferrer");
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
            Login
          </Button>
          <Button
            variant="outline-info"
            className="buttonNav"
            onClick={() => navigate("/register")}
          >
            Register
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
      <h1> whistles for you</h1>

      {/* modal lines are copied from react-bootstrap */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Share a whistle</Modal.Title>
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
        {blogs
          ? blogs.map((blog) => (
              // present the unique key for each child in the div
              <div key={blog._id} className="mappedPost">
                <h4>{blog.body}</h4>
                <p>read by {blog.readCount}</p>
                <p>{blog.readingTime} secs to read</p>
                <Button
                  variant="outline-warning"
                  className="buttonSuccess"
                  onClick={() => share(blog._id)}
                >
                  share on social
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
        back
      </Button>
    </div>
  );
}

export default OneWhistle;
