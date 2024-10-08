import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import ScrollToTop from "react-scroll-to-top";

const Footer = () => {
  const location = useLocation();
  // console.log(location);
  return (
    <>
      {location.pathname !== "/" &&location.pathname !== "/forgotpassword" && (
        <>
          <ScrollToTop
            smooth
            color="white"
            className="d-flex align-items-center justify-content-center"
            style={{ backgroundColor: "#0d67b5", zIndex: "100" }}
          />
          <div
            className="container-fluid text-black px-sm-3 px-md-5 p-2 footer"
          >
            <div className="container text-center">
              <div className="d-flex justify-content-center mb-2">
                <Link className="btn btn-light btn-social mx-2" style={{ border: "2px solid #0d67b5" }}>
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link className="btn btn-light btn-social mx-2" style={{ border: "2px solid #0d67b5" }} >
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link className="btn btn-light btn-social mx-2" style={{ border: "2px solid #0d67b5" }}>
                  <i className="fab fa-linkedin-in"></i>
                </Link>
                <Link className="btn btn-light btn-social mx-2" style={{ border: "2px solid #0d67b5" }}>
                  <i className="fab fa-instagram"></i>
                </Link>
              </div>
              <div className="d-flex flex-column justify-content-center">
                <Link to="/privacy">
                  Privacy Policy
                </Link>
                <Link to="/terms">
                  Terms and Conditions
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Footer;
