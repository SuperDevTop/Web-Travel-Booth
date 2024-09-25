import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";

const BlogView = () => {
    const { id: blogId } = useParams();
    const toast = useToast();
    const [blog, setBlog] = useState([]);
    useEffect(() => {
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
    }, [blogId, toast]);
    return (
      <div
        className="container-fluid pt-1"
        id="readBlog"
        style={{ backgroundColor: "#f6f6fe", minHeight: "100vh" }}
      >
        <div className="container" style={{marginTop:"75px"}}>
          <div className="position-relative d-flex align-items-center justify-content-center pb-2">
            <h1
              className="display-1 text-uppercase text-white"
              style={{ WebkitTextStroke: "1px #dee2e6", fontSize: "6rem" }}
            >
              Blog
            </h1>
            <h1
              className="position-absolute text-uppercase text-primary"
              style={{ fontSize: "1.5rem" }}
            >
              Read Blog
            </h1>
          </div>
          <div className="row">
            <div className="col-lg-8 col-md-8 mb-5 mx-auto">
              <div className="mb-4">
              <h1 className="font-weight-medium mb-4 text-center" style={{fontSize:"2.5rem"}}>{blog.title}</h1> 
                <div className="d-flex justify-content-center">
                <img
                  className="img-fluid rounded w-100 mb-2"
                  src={blog.image}
                  alt="blog"
                />
                </div>
                <p>
                  <span className="firstCharacter">{String(blog.content).substring(0, 1)}</span>
                  {String(blog.content).substring(1)}
                </p>             
              </div>                              
            </div>
            <div className="col-md-6 mx-auto">
            <Link
                to='/admin/blog'
                className="btn btn-sm btn-outline-primary py-2 mb-3 w-100"
              >
                Back
            </Link>  
            </div>
          </div>
        </div>
      </div>
  )
}

export default BlogView