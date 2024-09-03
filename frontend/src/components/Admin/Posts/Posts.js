import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import "./Posts.css";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [postCnt, setPostCnt] = useState(0);
  const [status, setStatus] = useState(false);
  const toast = useToast();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    const fetchPosts = async () => {
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

        const { data } = await axios.post(
          "/api/admin/posts",
          { today: "ALL" },
          config
        );
        setPosts(data.message);
        setPostCnt(data.message.length);
      } catch (error) {}
    };

    fetchPosts();
  }, [status]);

  const deletePostHandler = async(id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    await axios.delete(`/api/admin/posts/${id}`, config).then(response => {
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
  }
  return (
    <div className="dashboard-container w-100">
      <div className="dashboard-content-container" style={{paddingTop:"100px"}}>
        <div className="pagetitle mb-3">
          <h1>Posts</h1>
        </div>

        <section className="section dashboard">
          <div className="row">
            {/* <!-- Posts Today --> */}
            <div className="col-12">
              <div className="card top-selling overflow-auto">
                <div className="posts-card-body pb-0">
                  <h5 className="card-title p-3">
                    Posts <span>| {postCnt}</span>
                  </h5>

                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th scope="col">Preview</th>
                        <th scope="col">Title</th>
                        <th scope="col">Location</th>
                        <th scope="col">Sender</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map((post, i) => (
                        <tr key={i}>
                          <td className="td-image">
                            <img src={post.image} alt="" />
                          </td>
                          <td>
                            <span className="text-primary fw-bold">
                              {post.title}
                            </span>
                          </td>
                          <td>{post.location}</td>
                          <td className="fw-bold">{post.sender?.name }</td>
                          <td>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={(e) => deletePostHandler(post._id)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
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

export default PostsPage;
