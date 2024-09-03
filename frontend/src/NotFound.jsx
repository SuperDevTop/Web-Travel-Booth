import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const history = useHistory();
  useEffect(() => {
    const header = document.getElementById("header");
    const sidebar = document.getElementById("mySidebar");
    const AdminSidebar = document.getElementById("AdminSidebar");
    const footer = document.getElementsByClassName("footer")[0];
    if (header) {
      header.classList.add("hide");
      header.classList.remove("d-flex");
      sidebar.classList.add("hide");
      AdminSidebar.classList.add("hide");
      footer.classList.add("hide");
    }
  });

  const redirectHandler = () => {
    if (user.isAdmin === true) {
      history.push("/admin/dashboard");
      window.location.reload();
    } else {
      history.push("/capture");
      window.location.reload();
    }
  };
  console.log(user);
  return (
    <div className="notfound">
      <div className="row">
        <div className="col-md-12">
          <div className="error-template">
            <h2 class="d-flex justify-content-center align-items-center gap-2 mb-4">
              <span class="display-1 fw-bold">4</span>
              <i class="bi bi-exclamation-circle-fill text-danger display-4"></i>
              <span class="display-1 fw-bold bsb-flip-h">4</span>
            </h2>
            <h3 class="h2 mb-2">Oops! You're lost.</h3>
          <p class="mb-5">The page you are looking for was not found.</p>
            {/* <h1>Oops!</h1>
            <h2>404 Not Found</h2>
            <div className="error-details">
              Sorry, an error has occured, Requested page not found!
            </div> */}
            <div className="error-actions">
              <button
                onClick={redirectHandler}
                className="btn btn-info btn-lg text-white fw-semibold"
              >
                <span className="glyphicon glyphicon-home"></span>
                Back To Home{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
