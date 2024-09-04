// const Mailjet = import 'node-mailjet');
// const dotenv = require('dotenv');
import Mailjet from 'node-mailjet';
import dotenv from 'dotenv';

dotenv.config();

const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC, 
  process.env.MJ_APIKEY_PRIVATE
);
// console.log("EMAIL", process.env.MJ_APIKEY_PUBLIC)
export const sendEmail = async ({to, username, subject, text}) => {
  // console.log("info", to, username, subject, text)
  try {
    const request = await mailjet.post("send", { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: process.env.EMAIL, // Sender's email
            Name: "Hi Deadline"
          },
          To: [
            {
              Email: to, // Recipient's email
              Name: username
            }
          ],
          Subject: subject,
          TextPart: text, // Plain text part of the email
        //   HTMLPart: html, // HTML part of the email
        }
      ]
    });
    
    console.log("req", request.body);
  } catch (err) {
    console.error(err.statusCode, err.response.data);
    return false;
  }
  return true;
};

export const sendEmailUsers = async (
  to1,
  to2,
  username1,
  username2,
  subject,
  text,
  html
) => {
  try {
    const request = await mailjet.post("send", { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: process.env.EMAIL, // Sender's email
            Name: "Hi Deadline"
          },
          To: [
            {
              Email: to1, // Recipient's email
              Name: username1
            },
            {
              Email: to2, // Recipient's email
              Name: username2
            },
          ],
          Subject: subject,
          TextPart: text, // Plain text part of the email
          HTMLPart: html, // HTML part of the email
        }
      ]
    });
    console.log(request.body);
  } catch (err) {
    console.error(err.statusCode, err.response.data);
  }
}

