import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import ScrollToTop from "react-scroll-to-top";

const Footer = () => {
  const location = useLocation();
  // console.log(location);
  return (
    <>
    { location.pathname !== "/" && (
      <>
      <ScrollToTop
        smooth
        color="white"
        className="d-flex align-items-center justify-content-center"
        style={{ backgroundColor: "#0d67b5" }}
      />
      <div
        className="container-fluid text-black px-sm-3 px-md-5 p-2 footer" 
      >
        <div className="container text-center">
          <div className="d-flex justify-content-center mb-2">
            <Link className="btn btn-light btn-social mx-2" style={{border:"2px solid #0d67b5"}}>
              <i className="fab fa-twitter"></i>
            </Link>
            <Link className="btn btn-light btn-social mx-2" style={{border:"2px solid #0d67b5"}} >
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link className="btn btn-light btn-social mx-2" style={{border:"2px solid #0d67b5"}}>
              <i className="fab fa-linkedin-in"></i>
            </Link>
            <Link className="btn btn-light btn-social mx-2" style={{border:"2px solid #0d67b5"}}>
              <i className="fab fa-instagram"></i>
            </Link>
          </div>
          {/* <div className="d-flex justify-content-center mb-1">
            <Link className="text-black fw-semibold" to="#">
              Privacy
            </Link>
            <span className="px-3">|</span>
            <Link className="text-black fw-semibold" to="#">
              Terms
            </Link>
            <span className="px-3">|</span>
            <Link className="text-black fw-semibold" to="#">
              FAQs
            </Link>
            <span className="px-3">|</span>
            <Link className="text-black fw-semibold" to="#">
              Help
            </Link>
          </div> */}
          {/* <p className="m-0">&copy; <a className="text-white font-weight-bold" href="#">Web TravelBooth</a>. All Rights Reserved. Designed by <a className="text-white font-weight-bold" href="https://htmlcodex.com">...</a>
            </p> */}
        </div>
      </div>
    </>
    )}
    </>    
  );
};

export default Footer;
