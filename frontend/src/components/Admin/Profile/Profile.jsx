import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/toast";
import Loader from "../../Loader";

const Profile = () => {
  const [admin, setAdmin] = useState([]);
  const [adminName, setAdminName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState({ preview: "", data: "" });
  const [img, setImg] = useState(false);
  const [pic, setPic] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [renewPassword, setRenewPassword] = useState("");

  const toast = useToast();

  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const getAdmin = async () => {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if (user) {
        if (user.isAdmin === true) {
          document.getElementById("mySidebar").style.display = "none";
          document.getElementById("AdminSidebar").style.display = "block";
        } else {
          document.getElementById("mySidebar").style.display = "block";
          document.getElementById("AdminSidebar").style.display = "none";
        }
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.get(`/api/user/${user._id}`, config);
        setAdmin(data);
        setAdminName(admin.name);
        setFirstname(admin.firstname);
        setLastname(admin.lastname);
        setEmail(admin.email);
        setPhone(admin.phone);
      } catch (error) {}
    };

    getAdmin();
  }, [admin.email, admin.name, admin.lastname, admin.firstname, admin.phone]);
  
  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setFile(img);
    setImg(true);
  };

  const adminUpdateHandler = async (e) => {
    e.preventDefault();
    if (!adminName | !firstname | !lastname | !email | !phone)
      toast({
        title: "Error Occured!",
        description: "Input Field values",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    setPic(admin.pic);
    const formData = new FormData();
    formData.append("image", file.data);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      if (img) {
        const res = await axios.post("/api/upload", formData, config);
        const { data } = await axios.put(
          "/api/user/updateadmin",
          {
            _id: admin._id,
            name: adminName,
            firstname,
            lastname,
            email,
            phone,
            pic: res.data.image,
          },
          config
        );
        toast({
          title: "Success!",
          description: "Updated Successfully!",
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
      } else {
        const { data } = await axios.put(
          "/api/user/updateadmin",
          {
            _id: admin._id,
            name: adminName,
            firstname,
            lastname,
            email,
            phone,
            pic,
          },
          config
        );
        toast({
          title: "Success!",
          description: "Updated Successfully!",
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.err,
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const changePasswordHandler = async (e) => {
    e.preventDefault();
    // console.log(newPassword, renewPassword);
    if (newPassword !== renewPassword) {
      toast({
        title: "Error",
        description: "Not Match Password",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    } else {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        await axios.put(
          "/api/user/updateadmin",
          { _id: admin._id, newPassword },
          config
        );
        toast({
          title: "Success!",
          description: "Updated Successfully!",
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error.err,
          status: "error",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <div className="dashboard-container w-100">
      <div className="dashboard-content-container">
        <div className="pagetitle">
          <h1>Profile</h1>
        </div>

        <section className="section dashboard mt-4">
          <div className="row">
            <div className="col-xl-4">
              <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                  <img
                    src={!img ? admin.pic : file.preview}
                    alt="Profile"
                    className="rounded-circle mb-2"
                  />
                  <h1 style={{ fontSize: "24px" }} className="fw-bolder">
                    {admin.name}
                  </h1>
                  {/* <h3>{instrument}</h3> */}
                  <div className="social-links mt-2">
                    <Link className="twitter mx-1 fs-5" to="#">
                      <i className="bi bi-twitter"></i>
                    </Link>
                    <Link className="facebook mx-1 fs-5" to="#">
                      <i className="bi bi-facebook"></i>
                    </Link>
                    <Link className="instagram mx-1 fs-5" to="#">
                      <i className="bi bi-instagram"></i>
                    </Link>
                    <Link className="linkedin mx-1 fs-5" to="#">
                      <i className="bi bi-linkedin"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
              <div className="col-xl-8">
                <div className="card">
                  <div className="card-body pt-3">
                    <ul className="nav nav-tabs nav-tabs-bordered">
                      <li className="nav-item">
                        <button
                          className="nav-link active"
                          data-bs-toggle="tab"
                          data-bs-target="#profile-edit"
                        >
                          Edit Profile
                        </button>
                      </li>

                      <li className="nav-item">
                        <button
                          className="nav-link"
                          data-bs-toggle="tab"
                          data-bs-target="#profile-change-password"
                        >
                          Change Password
                        </button>
                      </li>
                    </ul>
                    <div className="tab-content pt-2">
                      {admin !== undefined ? (
                        <div
                        className="tab-pane fade show active profile-edit pt-3"
                        id="profile-edit"
                      >
                        <div className="row mb-3">
                          <label className="col-md-4 col-lg-3 col-form-label">
                            Profile Image
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <img
                              src={!img ? admin.pic : file.preview}
                              alt="Profile"
                            />
                            <div className="pt-2 mx-5">
                              <button
                                className="btn btn-primary btn-sm"
                                title="Upload new profile image"
                                onClick={() =>
                                  document
                                    .getElementById("imageFileSelect")
                                    .click()
                                }
                              >
                                <i className="bi bi-upload"></i>
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                title="Remove my profile image"
                                onClick={(e) => setImg(false)}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                              <input
                                id="imageFileSelect"
                                className="form-class hidden"
                                type="file"
                                onChange={handleFileChange}
                                hidden
                              />
                            </div>
                          </div>
                        </div>
                        <form>
                          <div className="row mb-3">
                            <label className="col-md-4 col-lg-3 col-form-label">
                              Name
                            </label>
                            <div className="col-md-8 col-lg-9">
                              <input
                                name="fullName"
                                type="text"
                                className="form-control"
                                value={adminName}
                                onChange={(e) => setAdminName(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="row mb-3">
                            <label className="col-md-4 col-lg-3 col-form-label">
                              First Name
                            </label>
                            <div className="col-md-8 col-lg-9">
                              <input
                                name="fullName"
                                type="text"
                                className="form-control"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="row mb-3">
                            <label className="col-md-4 col-lg-3 col-form-label">
                              Last Name
                            </label>
                            <div className="col-md-8 col-lg-9">
                              <input
                                name="fullName"
                                type="text"
                                className="form-control"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="row mb-3">
                            <label className="col-md-4 col-lg-3 col-form-label">
                              Phone
                            </label>
                            <div className="col-md-8 col-lg-9">
                              <input
                                name="phone"
                                type="text"
                                className="form-control"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="row mb-3">
                            <label className="col-md-4 col-lg-3 col-form-label">
                              Email
                            </label>
                            <div className="col-md-8 col-lg-9">
                              <input
                                name="email"
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn btn-primary text-white fw-semibold"
                              onClick={(e) => adminUpdateHandler(e)}
                            >
                              Update
                            </button>
                          </div>
                        </form>
                      </div>
                      ):(
                        <Loader />
                      )}

                      <div
                        className="tab-pane fade pt-3"
                        id="profile-change-password"
                      >
                        <form>
                          {/* <div className="row mb-3">
                          <label className="col-md-4 col-lg-3 col-form-label">
                            Current Password
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="password"
                              type="password"
                              className="form-control"
                              value={admin.password}
                            />
                          </div>
                        </div> */}

                          <div className="row mb-3">
                            <label className="col-md-4 col-lg-3 col-form-label">
                              New Password
                            </label>
                            <div className="col-md-8 col-lg-9">
                              <input
                                name="newpassword"
                                type="password"
                                className="form-control"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="row mb-3">
                            <label className="col-md-4 col-lg-3 col-form-label">
                              Re-enter New Password
                            </label>
                            <div className="col-md-8 col-lg-9">
                              <input
                                name="renewpassword"
                                type="password"
                                className="form-control"
                                value={renewPassword}
                                onChange={(e) =>
                                  setRenewPassword(e.target.value)
                                }
                              />
                            </div>
                          </div>

                          <div className="text-center">
                            <button
                              className="btn btn-primary fw-semibold text-white"
                              onClick={(e) => changePasswordHandler(e)}
                            >
                              Change Password
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
