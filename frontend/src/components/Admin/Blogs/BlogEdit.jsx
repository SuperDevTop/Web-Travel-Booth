import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loader from "../../Loader";

const BlogEdit = () => {
  const { id: blogId } = useParams();

  const toast = useToast();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [blog, setBlog] = useState([]);
  const [originalImage, setOriginalImage] = useState("");

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

    const fetchBlog = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const resBlog = await axios.get(`/api/blog/${blogId}`, config);
        setBlog(resBlog.data);
        // console.log(resBlogs.data)
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
    fetchBlog();
    setTitle(blog.title);
    setContent(blog.content);
    setOriginalImage(blog.image);
  }, [blog.title, blog.content, blog.image, toast, blogId, user]);
  console.log(originalImage);

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
      const {data} = await axios.put(
        `/api/blog/${blog._id}`,
        {
          title: title,
          content: content,
          image: image,
        },
        config
      );
      console.log(data);
      toast({
        title: "Success!",
        description: "Updated Successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      history.push("/admin/blog");
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
            Blogs
          </h1>
          <h1
            className="position-absolute text-uppercase text-primary"
            style={{ fontSize: "2.5rem" }}
          >
            Edit Blog
          </h1>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="contact-form text-center">
              <div id="success"></div>
              {blog === undefined ? (
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
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      data-validation-required-message="Please enter blog contents"
                    ></textarea>
                    <p className="help-block text-danger"></p>
                  </div>
                  <div>
                    <button
                      className="btn btn-outline-primary w-100"
                      onClick={updateHandler}
                    >
                      Update
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogEdit;
