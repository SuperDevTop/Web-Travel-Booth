export const forgotMessage = (resetUrl, user) => {
  return `   
    Dear ${user.name}
    Please click the link below to reset your account password. If you did not request this password reset, you can safely disregard this email.
    ${resetUrl}
    If the above link does not work, please copy and paste the following URL into your web browser.
    Best regards, The Travelbooth Team            
    `
}

export const emailVerifyMessage = (emailUrl, name) => {
  return `
  Dear ${name}
    Please click the link below to register your new account.
    ${emailUrl}
    If the above link does not work, please copy and paste the following URL into your web browser.
    Best regards, The Travelbooth Team
  `
}