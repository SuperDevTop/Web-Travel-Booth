import React, {useEffect, useState} from 'react'
import './Blog.css'
import axios from 'axios'
import BlogComponent from './BlogComponent';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        if(user){
          if(user.isAdmin===true){
            document.getElementById('mySidebar').style.display="none";
            document.getElementById('AdminSidebar').style.display="block";  
          }
          else{
            document.getElementById('mySidebar').style.display="block";
            document.getElementById('AdminSidebar').style.display="none";  
          }
        }
        const fetchBlogs = async () => {
            try {
              const config = {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              };
        
              const resBlogs = await axios.get("/api/blog", config);
            setBlogs(resBlogs.data);
            console.log(resBlogs.data)
            } catch (error) {
              console.log(error);
              //toast({title: "Error Occured!", description: "Failed to Load the Posts", status: "error", duration: 5000, isClosable: true, position: "top-right"});
            }
          };
          fetchBlogs();
    }, [])
    
    const handlePageChange = (pageNumber) => {
      if (
        pageNumber > 0 &&
        pageNumber <= Math.ceil(blogs.length / 6) &&
        pageNumber !== page
      )
        setPage(pageNumber);
    };
  return (
    <div className="container-fluid pt-1" id="blog" style={{backgroundColor:"#f6f6fe", minHeight: "100vh"}}>
        <div className="container" style={{marginTop:"75px"}}>
            <div className="position-relative d-flex align-items-center justify-content-center pb-2">
                <h1 className="display-1 text-uppercase text-white" 
                style={{WebkitTextStroke: '1px #dee2e6', fontSize:"9rem"}}>Blog</h1>
                <h1 className="position-absolute text-uppercase text-primary" style={{fontSize:"3rem"}}>Latest Blog</h1>
            </div>
            <div className="row">
                { blogs.length > 0 && blogs.slice(page * 6 - 6, page * 6).map((blog) => (
                  <BlogComponent blog={blog} key={blog._id} />
                ))}
            </div>
            <div className="row mb-3">
                    {blogs.length > 0 && (
                      <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                          <li className="page-item">
                            <span
                              className="page-link"
                              onClick={() => handlePageChange(page - 1)}
                              aria-label="Previous"
                            >
                              <span aria-hidden="true">&laquo;</span>
                            </span>
                          </li>
                          {[...Array(Math.ceil(blogs.length / 6))].map(
                            (_, i) => (
                              <li
                                className={`page-item ${
                                  i + 1 === page ? "active" : ""
                                }`}
                                key={i + 1}
                              >
                                <span
                                  className="page-link"
                                  onClick={() => handlePageChange(i + 1)}
                                >
                                  {i + 1}
                                </span>
                              </li>
                            )
                          )}

                          <li className="page-item">
                            <span
                              className="page-link"
                              onClick={() => handlePageChange(page + 1)}
                              aria-label="Next"
                            >
                              <span aria-hidden="true">&raquo;</span>
                            </span>
                          </li>
                        </ul>
                      </nav>
                    )}
                  </div>
        </div>
    </div>
  )
}

export default Blog