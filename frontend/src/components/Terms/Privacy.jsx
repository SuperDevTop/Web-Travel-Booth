import React, { useEffect } from 'react'

const Privacy = () => {
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
                    <h1 className='text-center mb-4 mt-3 text-info' style={{fontSize:"1.5rem"}}>Privacy Policy</h1>
                    <p>TravelBooth is committed to protecting your privacy. This policy outlines how we collect, use, and protect your personal information.</p>

                    <h2>Information Collection</h2>
                    <p>We collect personal data such as name, email address, and travel preferences, as well as non-personal data like browser type and referring URLs.</p>

                    <h2>Use of Information</h2>
                    <p>We use your information to enhance your experience on TravelBooth, such as providing personalized content and communicating new features or promotions.</p>

                    <h2>Data Sharing and Disclosure</h2>
                    <p>We do not sell your personal information to third parties. We may share data with partners to improve our services, under strict confidentiality agreements.</p>

                    <h2>Data Security</h2>
                    <p>We employ security measures to safeguard your information, including secure servers and data encryption protocols.</p>

                    <h2>User Rights</h2>
                    <p>You have the right to access, correct, or delete your personal data. Contact us at [contact email] for any requests related to your personal information.</p>

                    <h2>Cookies and Tracking Technologies</h2>
                    <p>Our site uses cookies to enhance your user experience. You can control cookie settings in your browser. Continued use of our site indicates consent to our use of cookies.</p>
                    <h2>Policy Changes</h2>
                    <p>We may update this privacy policy periodically. Changes will be posted on this page, and significant changes will be communicated via email.</p>

                    <h2>Contact Information</h2>
                    <p>For any questions about this privacy policy, please <a href="mailto:contact@travelbooth.com">contact us</a>.</p>
                </div>
            </div>
        </div>
    )
}

export default Privacy