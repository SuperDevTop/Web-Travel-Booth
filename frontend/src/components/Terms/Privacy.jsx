import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Privacy = () => {
    const [policys, setPolicys] = useState([]);
    const user = JSON.parse(localStorage.getItem("userInfo"));
    useEffect(() => {
        if (user) {
            if (user.isAdmin === "true") {
                document.getElementById("mySidebar").style.display = "none";
                document.getElementById("AdminSidebar").style.display = "block";
            } else {
                document.getElementById("mySidebar").style.display = "block";
                document.getElementById("AdminSidebar").style.display = "none";
            }
        }
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        const fetchPolicys = async () => {
            const { data } = await axios.get("/api/admin/policy", config);
            setPolicys(data.message);
        }
        fetchPolicys();
    }, [])
    return (
        <div className="container-fluid pt-2 pb-5 h-100" id="about" style={{ backgroundColor: "white" }}>
            <div className="container" style={{ marginTop: "75px" }}>
                <div className="position-relative d-flex align-items-center justify-content-center pb-3">
                    <h1 className="display-1 text-uppercase text-white" style={{ WebkitTextStroke: "1px #dee2e6", fontSize: "5rem" }}>Privacy</h1>
                    <h1 className="position-absolute text-uppercase text-primary" style={{ fontSize: "2.5rem" }}>Policy</h1>
                </div>
                {
                    policys.length > 0 ? policys.map((t, index) => (
                        <>
                            <h2 className='fs-3 mb-1 mt-3' key={index}>{t.title}</h2>
                            <p>{t.description}</p>
                        </>
                    )) : (
                        <h2>There is no any policy</h2>
                    )
                }
            </div>
        </div>
    )
}

export default Privacy