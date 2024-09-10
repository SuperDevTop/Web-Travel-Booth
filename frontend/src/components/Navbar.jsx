import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./styles.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  
  const [notificationsCount, setCount] = useState(0);
  const user = JSON.parse(localStorage.getItem("userInfo") === undefined ? "" :localStorage.getItem("userInfo"));
  const location = useLocation();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/";
  };

  const fetchPosts = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/post/index",
        { sender: user._id },
        config
      );
      let arr_tmp = [];
      let cnt_tmp = 0;
      data.message.forEach((post) => {
        post.reviews.forEach((review) => {
          if (!review.noticed) {
            arr_tmp.push({
              _id: post._id,
              title: post.title,
              sender: {
                _id: review.user._id,
                name: review.user.email,
              },
              comment: review.comment,
              liked: review.liked,
            });
            cnt_tmp++;
          }
        });
      });

      const data_notify = (
        await axios.post(
          "/api/post/notified_posts",
          { sender: user._id },
          config
        )
      ).data.message;
      setCount(cnt_tmp + data_notify.length);
    } catch (error) {}
  };
  useEffect(() => {
    const isDarkMode = localStorage.getItem("isDarkMode");
    if (isDarkMode === true) {
      document.documentElement.dataset.bsTheme = "dark";
    }
    // Mock fetching posts
    fetchPosts();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {location.pathname !== "/" && location.pathname !== "/chats" && (
        <header
          id="header"
          className="header fixed-top d-flex align-items-center px-3 shadow-lg"
        >
          <div id="logo" className="d-flex justify-content-between">
            <Link to={user && user.isAdmin === true ? "/admin/dashboard" :"/capture"} className="logo d-flex align-items-center">
              <img
                src={logo}
                alt="logo"
                width="70px"
                height="60px"
                className="fa fa-beat"
              />
              <h1
                className="text-uppercase"
                style={{ fontSize: "1.3rem", color: "#012970" }}
              >
                travelbooth
              </h1>
            </Link>
          </div>
          <nav className="header-nav ms-auto">
            <ul className="d-flex align-items-center">
              {user && user.isAdmin !== true && (
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link nav-icon"
                    to="/notifications"
                  >
                    <i
                      className={`fa bi bi-bell ${
                        notificationsCount > 0 ? "fa-shake" : ""
                      }`}
                    ></i>
                    <span className="badge bg-primary badge-number">
                      {notificationsCount}
                    </span>
                  </Link>
                </li>
              )}

              <li className="nav-item dropdown pe-3">
                <Link
                  className="nav-link nav-profile d-flex align-items-center pe-0"   
                  to="#"               
                  data-bs-toggle="dropdown"
                >
                  <img
                    src={user && user.pic}
                    alt="Profile"
                    className="rounded-circle"
                  />
                  <span className="d-none d-md-block dropdown-toggle ps-2">
                    {user && user.firstname}
                  </span>
                </Link>

                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                  <li className="dropdown-header">
                    <h6>{user && user.name}</h6>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <Link
                      className="dropdown-item d-flex align-items-center"
                      to={user && user.isAdmin === true ? "/admin/profile" : "/account"}
                    >
                      <i className="bi bi-gear"></i>
                      <span>Account</span>
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <span
                      onClick={logoutHandler}
                      className="dropdown-item d-flex align-items-center"
                    >
                      <i className="bi bi-box-arrow-right"></i>
                      <span>Log Out</span>
                    </span>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </header>
      )}
    </>
  );
};

export default Navbar;
