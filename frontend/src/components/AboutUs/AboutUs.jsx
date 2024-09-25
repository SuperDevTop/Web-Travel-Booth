import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import Loader from '../Loader'

const AboutUs = () => {
    const [admin, setAdmin] = useState([]);
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

        const getAdmin = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const { data } = await axios.get('/api/user/admin', config);
                setAdmin(data);
                console.log("data", data)
            } catch (error) { }
        };

        getAdmin();
    }, []);
    console.log("admin", admin)
    return (
        <>
            <div className="container-fluid pt-2 pb-5 h-100" id="about" style={{ backgroundColor: "white" }}>
                <div className="container" style={{ marginTop: "75px" }}>
                    <div className="position-relative d-flex align-items-center justify-content-center pb-3">
                        <h1 className="display-1 text-uppercase text-white" style={{ WebkitTextStroke: "1px #dee2e6", fontSize: "7rem" }}>About</h1>
                        <h1 className="position-absolute text-uppercase text-primary" style={{ fontSize: "3.5rem" }}>About Us</h1>
                    </div>
                    {
                        admin[0]?.pic === undefined ? (
                            <Loader />
                        ) : (
                            <div className="row align-items-center pb-5">
                                <div className="col-lg-5 pb-4 pb-lg-0">
                                    <img className="img-fluid rounded" src={admin[0].pic} alt="me" width="400px" height="400px" />
                                </div>
                                <div className="col-lg-7">
                                    <h1 className="mb-4" style={{ fontSize: "2.5rem" }}>Travel Booth</h1>
                                    <h4 style={{ fontSize: "2rem" }}>Travel company</h4>
                                    <br></br>
                                    <div className="row mb-3">
                                        <div className="col-sm-6 py-2" style={{ fontSize: "1.5rem" }}><h5>Name: <span className="text-secondary">{admin[0].name}</span></h5></div>
                                        {/* <div className="col-sm-6 py-2"><h5>Birthday: <span className="text-secondary">{admin[0].}</span></h5></div> */}
                                        {/* <div className="col-sm-6 py-2"><h5>Experience: <span className="text-secondary">10 Years</span></h5></div> */}
                                        <div className="col-sm-6 py-2" style={{ fontSize: "1.5rem" }}><h5>Phone: <span className="text-secondary">{admin[0].phone}</span></h5></div>
                                        <div className="col-sm-6 py-2" style={{ fontSize: "1.5rem" }}><h5>Email: <span className="text-secondary">{admin[0].email}</span></h5></div>
                                        {/* <div className="col-sm-6 py-2"><h5>Address: <span className="text-secondary">123 Street, New York, USA</span></h5></div> */}
                                    </div>
                                    <span className="position-absolute text-primary pb-5" style={{ fontSize: "1.5rem" }}>Message Me <Link className='pe-auto text-danger' style={{ fontSize: "2.5rem" }}>{admin[0].email}</Link></span>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default AboutUs