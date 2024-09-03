export const forgotMessage = (resetUrl, user) => {
    return `   
      Hello ${user.name}
      Tap the link below to reset your account password. If you didn't request 
      new password, you can safely delete this email.
      "${resetUrl}"
      If that doesn't work, copy and paste the following link in your browser.
      Best regards,
      Travelbooth Team              
      `
  }
  