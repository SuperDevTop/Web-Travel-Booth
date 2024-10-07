import React, { useEffect } from 'react'

const Terms = () => {
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
    }, [])
    return (
        <div className="notificationPage-container w-100 bg-white">
            <div className="notifications-container bg-white py-4 px-5">
                <div className='d-flex flex-column gap-2 mt-5'>
                    <h1 className='text-center mb-4 mt-3 text-info' style={{ fontSize: "1.5rem" }}>Terms and Conditions</h1>
                    <p>Welcome to TravelBooth! By accessing or using our website, you agree to be bound by these terms and conditions. If you disagree with any part, you must refrain from using our site.</p>

                    <h2>User Responsibilities</h2>
                    <p>Users must ensure their use of the site complies with all applicable laws and regulations. You agree not to post or transmit any harmful, unlawful, or offensive content.</p>

                    <h2>Content Ownership and Licensing</h2>
                    <p>By posting content on TravelBooth, you grant us a non-exclusive, royalty-free license to use, reproduce, and distribute your content in connection with the operation of the site.</p>

                    <h2>Account Management</h2>
                    <p>Users are responsible for maintaining the confidentiality of their account information and for all activities under their account. We reserve the right to suspend or terminate any account at our discretion.</p>

                    <h2>Limitation of Liability</h2>
                    <p>TravelBooth is not liable for any direct, indirect, incidental, or consequential damages arising from your use of the site or any content posted by users.</p>

                    <h2>Modification of Terms</h2>
                    <p>We reserve the right to modify these terms at any time. Changes will be posted on this page, and your continued use of the site constitutes acceptance of the new terms.</p>

                    <h2>Governing Law</h2>
                    <p>These terms shall be governed by and construed in accordance with the laws of [Your Country/State].</p>

                    <p>If you have any questions, please <a href="mailto:contact@travelbooth.com">contact us</a>.</p>
                </div>
            </div>
        </div>
    )
}

export default Terms