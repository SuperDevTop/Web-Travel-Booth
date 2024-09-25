import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useToast } from '@chakra-ui/toast'
import { useHistory } from 'react-router-dom';

const BlogPost = () => {
    const toast = useToast();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");

    const history = useHistory();

    const user = JSON.parse(localStorage.getItem("userInfo"));

    useEffect(() => {
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
    }, [user]);

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
        };        
    }
    const submitHandler = async (e) => {
        e.preventDefault();
    if (!title)
      toast({
        title: "Error Occured!",
        description: "Input the Blog Title",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    if (!content)
      toast({
        title: "Error Occured!",
        description: "Input Blog Contents",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    if (!image)
      toast({
        title: "Error Occured!",
        description: "Import Blog Image",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const reqData = {
          title: title,
          content: content,
          image: image,
        };
        const { data } = await axios.post("/api/blog/post", reqData, config);
        // console.log(data)
        if (data.state === "Ok") {
            toast({
                title: "Success!",
                description: "Blog submitted successfully.",
                status: "success",
                position: "top-right",
                duration: 5000,
                isClosable: true,
              });
              history.push('/admin/blog');
        }
    } catch (error) {
        toast({
          title: "Error Occured!",
          description: "the Same Blog Already Exists",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    }
  return (
    <div className="container-fluid pt-3" id="contact" style={{backgroundColor:"#f6f6fe", minHeight: "100vh"}}>
        <div className="container" style={{marginTop:"75px"}}>
            <div className="position-relative d-flex align-items-center justify-content-center pb-3">
                <h1 className="display-1 text-uppercase text-white" style={{WebkitTextStroke: "1px #dee2e6", fontSize:"7rem"}}>Blogs</h1>
                <h1 className="position-absolute text-uppercase text-primary" style={{fontSize:"2.5rem"}}>Post Blog</h1>
            </div>
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="contact-form text-center">
                        <div id="success"></div>
                        <form id="contactForm" noValidate="novalidate">
                            <div className="form-row">
                                <div className="control-group col-sm-12 mb-3">
                                    <input type="text" value={title} onChange={ (e) => setTitle(e.target.value)} className="form-control p-2 px-4" id="title" placeholder="Title"
                                        required="required" data-validation-required-message="Please enter a title" />
                                    <p className="help-block text-danger"></p>
                                </div>
                                {/* <div className="control-group col-sm-6 mb-3">
                                    <input type="email" className="form-control p-2 px-4" id="email" placeholder="Your Email"
                                        required="required" data-validation-required-message="Please enter your email" />
                                    <p className="help-block text-danger"></p>
                                </div> */}
                            </div>
                            <div className="control-group mb-3">
                                <input type="file" onChange={uploadFileHandler} className="form-control p-2 px-4" id="subject" placeholder="Subject"
                                    required="required" data-validation-required-message="Please enter a subject" />
                                <p className="help-block text-danger"></p>
                            </div>
                            <div className="control-group mb-3">
                                <textarea className="form-control py-3 px-4" rows="7" placeholder="Content"
                                    required="required"
                                    value={content}
                                    onChange={ (e) => setContent(e.target.value)}
                                    data-validation-required-message="Please enter blog contents"></textarea>
                                <p className="help-block text-danger"></p>
                            </div>
                            <div className='d-flex justify-content-between gap-2'>
                                <button className="btn btn-outline-primary w-50" onClick={(e) => submitHandler(e)}>Submit
                                </button>
                                <button className="btn btn-outline-danger w-50" onClick={(e) => history.push('/admin/blog')}>Back
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BlogPost