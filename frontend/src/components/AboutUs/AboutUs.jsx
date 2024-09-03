import {useEffect} from 'react'
import about from '../../assets/img/about.jpg'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const AboutUs = () => {
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
    }, [])
  return (
    <>
    <div className="container-fluid pt-2 pb-5" id="about" style={{backgroundColor:"white"}}>
        <div className="container" style={{marginTop:"75px"}}>
            <div className="position-relative d-flex align-items-center justify-content-center pb-3">
                <h1 className="display-1 text-uppercase text-white" style={{WebkitTextStroke: "1px #dee2e6", fontSize:"7rem"}}>About</h1>
                <h1 className="position-absolute text-uppercase text-primary" style={{fontSize:"3.5rem"}}>About Us</h1>
            </div>
            <div className="row align-items-center">
                <div className="col-lg-5 pb-4 pb-lg-0">
                    <img className="img-fluid rounded w-100" src={about} alt="me"/>
                </div>
                <div className="col-lg-7">
                    <h1 className="mb-4">Travel Booth</h1>
                    <p>Travel company</p>
                    <br></br>
                    <div className="row mb-3">
                        <div className="col-sm-6 py-2"><h6>Name: <span className="text-secondary">Kate Winslet</span></h6></div>
                        <div className="col-sm-6 py-2"><h6>Birthday: <span className="text-secondary">1 April 1990</span></h6></div>
                        <div className="col-sm-6 py-2"><h6>Degree: <span className="text-secondary">Master</span></h6></div>
                        <div className="col-sm-6 py-2"><h6>Experience: <span className="text-secondary">10 Years</span></h6></div>
                        <div className="col-sm-6 py-2"><h6>Phone: <span className="text-secondary">+012 345 6789</span></h6></div>
                        <div className="col-sm-6 py-2"><h6>Email: <span className="text-secondary">info@example.com</span></h6></div>
                        <div className="col-sm-6 py-2"><h6>Address: <span className="text-secondary">123 Street, New York, USA</span></h6></div>
                        <div className="col-sm-6 py-2"><h6>Freelance: <span className="text-secondary">Available</span></h6></div>
                    </div>
                    <span className="position-absolute text-primary" style={{fontSize:"2.5rem"}}>Message Me <Link className='pe-auto'>info@example.com</Link></span>
                </div>
            </div>
        </div>
    </div>
    {/* <div className="container-fluid pt-3 pb-5" id="contact" style={{backgroundColor:"white"}}>
        <div className="container">
            <div className="position-relative d-flex align-items-center justify-content-center pb-3">
                <h1 className="display-1 text-uppercase text-white" style={{WebkitTextStroke: "1px #dee2e6", fontSize:"10rem"}}>Contact</h1>
                <h1 className="position-absolute text-uppercase text-primary" style={{fontSize:"2.5rem"}}>Contact Us</h1>
            </div>
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="contact-form text-center">
                        <div id="success"></div>
                        <form name="sentMessage" id="contactForm" noValidate="novalidate">
                            <div className="form-row">
                                <div className="control-group col-sm-6 mb-3">
                                    <input type="text" className="form-control p-2 px-4" id="name" placeholder="Your Name"
                                        required="required" data-validation-required-message="Please enter your name" />
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div className="control-group col-sm-6 mb-3">
                                    <input type="email" className="form-control p-2 px-4" id="email" placeholder="Your Email"
                                        required="required" data-validation-required-message="Please enter your email" />
                                    <p className="help-block text-danger"></p>
                                </div>
                            </div>
                            <div className="control-group mb-3">
                                <input type="text" className="form-control p-2 px-4" id="subject" placeholder="Subject"
                                    required="required" data-validation-required-message="Please enter a subject" />
                                <p className="help-block text-danger"></p>
                            </div>
                            <div className="control-group mb-3">
                                <textarea className="form-control py-3 px-4" rows="5" id="message" placeholder="Message"
                                    required="required"
                                    data-validation-required-message="Please enter your message"></textarea>
                                <p className="help-block text-danger"></p>
                            </div>
                            <div>
                                <button className="btn btn-outline-primary" type="submit" id="sendMessageButton">Send
                                    Message</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div> */}
    </>
  )
}

export default AboutUs