import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import Loader from '../../Loader';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const PostEdit = () => {

  const { id:postId } = useParams();
  console.log(postId)
  const [post, setPost] = useState([]);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");

  const toast = useToast();
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    if (user) {
      if (user.isAdmin === true) {
        document.getElementById("mySidebar").style.display = "none";
        document.getElementById("AdminSidebar").style.display = "block";
      } else {
        document.getElementById("mySidebar").style.display = "block";
        document.getElementById("AdminSidebar").style.display = "none";
      }
    }
    const fetchPost = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const {data} = await axios.post("/api/post/edit",{id:postId}, config);
        setPost(data.message[0]);
        setTitle(post.title);
        setDetail(post.details);
        setLocation(post.location);
      } catch (err) {
        toast({
          title: "Error Occured!",
          description: err.error,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    };
    fetchPost();
  }, [post.title, post.details, post.location]);
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const res = await axios.post("/api/upload", formData, config);
      toast({
        title: "Success!",
        description: res.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setImage(res.data.image);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the locations",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };
  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/post/${post._id}`,
        {
          title,
          detail,
          image,
        },
        config
      );
      console.log(data)
      toast({
        title: "Success!",
        description: "Updated Successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      history.push("/admin/posts");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed updating",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };
  return (
    <div
      className="container-fluid pt-3"
      id="contact"
      style={{ backgroundColor: "#f6f6fe", minHeight: "100vh" }}
    >
      <div className="container" style={{ marginTop: "75px" }}>
        <div className="position-relative d-flex align-items-center justify-content-center pb-3">
          <h1
            className="display-1 text-uppercase text-white"
            style={{ WebkitTextStroke: "1px #dee2e6", fontSize: "7rem" }}
          >
            Posts
          </h1>
          <h1
            className="position-absolute text-uppercase text-primary"
            style={{ fontSize: "2.5rem" }}
          >
            Edit Post
          </h1>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="contact-form text-center">
              <div id="success"></div>
              {title === undefined ? (
                <Loader />
              ) : (
                <form id="contactForm" noValidate="novalidate">
                  <div className="form-row">
                    <div className="control-group col-sm-12 mb-3">
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control p-2 px-4"
                        id="title"
                        placeholder="Title"
                        required="required"
                        data-validation-required-message="Please enter a title"
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                    {/* <div className="control-group col-sm-6 mb-3">
                                    <input type="email" className="form-control p-2 px-4" id="email" placeholder="Your Email"
                                        required="required" data-validation-required-message="Please enter your email" />
                                    <p className="help-block text-danger"></p>
                                </div> */}
                  </div>
                  <div className="control-group mb-3">
                    <input
                      type="file"
                      onChange={uploadFileHandler}
                      className="form-control p-2 px-4"
                      id="subject"
                      placeholder="Subject"
                      required="required"
                      data-validation-required-message="Please enter a subject"
                    />
                    <p className="help-block text-danger"></p>
                  </div>
                  <div className="control-group mb-3">
                    <textarea
                      className="form-control py-3 px-4"
                      rows="7"
                      placeholder="Content"
                      required="required"
                      value={detail}
                      onChange={(e) => setDetail(e.target.value)}
                      data-validation-required-message="Please enter blog contents"
                    ></textarea>
                    <p className="help-block text-danger"></p>
                  </div>
                  <div className="d-flex justify-content-between gap-2">
                    <button
                      className="btn btn-outline-primary w-50"
                      onClick={updateHandler}
                    >
                      Update
                    </button>
                    <button className="btn btn-outline-danger w-50" onClick={(e) => history.push('/admin/posts')}>Back</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostEdit