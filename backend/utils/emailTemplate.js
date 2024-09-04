export const forgotMessage = (resetUrl, user) => {
    return `
            <body 
              style="
                color: rgb(68, 68, 68);
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              "
            >
              <h2 class="title" style="text-align: center">Reset Your Password</h2>
              <h4>Dear ${user.name},</h4>
              <p>
                Please click the link below to reset your account password. 
                If you did not request this password reset, you can safely disregard this email.
        
                <a
                  class="reset-btn"
                  style="
                    color: rgb(68, 68, 68);
                    font-weight: 900;
                    text-decoration: none;
                    text-transform: uppercase;
                  "
                  target="blank"
                  href="${resetUrl}"
                >
                  Reset Password
                </a>
              </p>
        
              <p>
                If that doesn't work, copy and paste the following link in your browser:
              </p>
              <div class="text-link">
                <a target="blank" href="${resetUrl}"> ${resetUrl} </a>
              </div>
        
              <p class="footer" style="font-size: small; font-style: italic">
                <span>Best regards,</span> <br />
                <span>The Travelbooth Team</span>
              </p>
            </body>
        `
  }
  