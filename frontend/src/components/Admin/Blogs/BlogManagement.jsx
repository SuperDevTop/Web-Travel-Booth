import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const BlogManagement = () => {
  const [blogCnt, setBlogCnt] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [status, setStatus] = useState(false);

  const toast = useToast();

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
    const fetchBlogs = async () => {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.get("/api/blog", config);
        setBlogCnt(data.length);
        setBlogs(data);
      } catch (error) { }
    };
    fetchBlogs();
  }, [user, status]);

  const deleteBlogHandler = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    await axios.delete(`/api/blog/${id}`, config).then(response => {
      toast({
        title: "Success!",
        description: "Deleted Successfully!",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      setStatus(!status);
    })
  };

  //   const editBlogHandler = () => {
  //     console.log("Clicked");
  //   };
  return (
    <div className="dashboard-container w-100">
      <div
        className="dashboard-content-container"
        style={{ paddingTop: "100px" }}
      >
        <div className="pagetitle mb-3">
          <h1>Blogs</h1>
        </div>

        <section className="section dashboard">
          <div className="row">
            {/* <!-- Posts Today --> */}
            <div className="col-12">
              <div className="card top-selling">
                <div className="posts-card-body pb-0">
                  <div className="row">
                    <div className="d-flex justify-content-between px-5">
                      <h5 className="card-title p-3">
                        Blogs <span>| {blogCnt}</span>
                      </h5>
                      <div className="d-flex align-items-center">
                        <Link to="/admin/blogpost" className="btn btn-primary rounded text-white fw-semibold">
                          <i className="fa fa-plus" /> Add Blog
                        </Link>
                      </div>
                    </div>
                  </div>

                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th scope="col">Preview</th>
                        <th scope="col">Title</th>
                        <th scope="col">content</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogs.map((blog, i) => (
                        <tr key={i}>
                          <td className="td-image">
                            <img src={blog.image} alt="" />
                          </td>
                          <td>
                            <span className="text-primary fw-bold">
                              {String(blog.title).substring(0, 20)}
                            </span>
                          </td>
                          <td>{String(blog.content).substring(0, 30)}...</td>

                          <td>
                            <div className="d-flex justify-content-center gap-3">
                              <Link
                                className="btn btn-sm btn-primary text-white"
                                to={`/admin/blogs/${blog._id}/view`}
                              >
                                <i className="bi bi-eye-fill"></i>
                              </Link>
                              <Link
                                className="btn btn-sm btn-info text-white"
                                to={`/admin/blogs/${blog._id}/edit`}
                              >
                                <i className="bi bi-pencil"></i>
                              </Link>

                              <button
                                className="btn btn-sm btn-danger"
                                onClick={(e) => deleteBlogHandler(blog._id)}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogManagement;
