import asyncHandler from 'express-async-handler'
import generateToken from '../config/generateToken.js';
import User from '../models/userModel.js';
import crypto from "crypto"
import { sendEmail } from '../utils/jetMailer.js';
import { forgotMessage } from '../utils/emailTemplate.js'

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

//@description     Get or Search all users
//@route           GET /api/user?id=
//@access          Public
const GetUserById = asyncHandler(async (req, res) => {  
  
  const user = await User.findById(req.params.id);
  
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, firstname, lastname, email, password, pic, phone } = req.body;
 
  if (!name || !firstname || !lastname || !email || !password || !phone) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({name, firstname, lastname, email, password, phone, pic});

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@description     UPdate a user
//@route           PUT /api/user/update
//@access          Public
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
 
 
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.pic = req.body.pic || user.pic;

    // if (req.body.password) {
    //   user.password = req.body.password;
    // }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      phone: updatedUser.phone,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
 
});

//@description     Auth the user
//@route           POST /api/user/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password)
  const user = await User.findOne({ email });
// console.log(user)
//  console.log("first",await user.matchPassword(password))
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// @desc    Update admin profile
// @route   PUT /api/user/updateadmin
// @access  Admin

const updateAdminProfile = asyncHandler(async (req, res) => {
  
  const user = await User.findById(req.body._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;

    if (req.body.newPassword) {
      user.password = req.body.newPassword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
//@description     Reset the user password
//@route           POST /api/user/forgotPassword
//@access          Public
const postForgotPassword = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body
    console.log(req.body)
    console.log("eeee", email)
    if (!email)
      return res.status(404).send({ error: 'Please enter your email' })

    const user = await User.findOne({ email })
    // console.log("user", user)
    if (!user)
      return res.status(404).json({ error: 'No email could not be send' })

    const resetToken = crypto.randomBytes(20).toString('hex');
    // console.log("resetToken", resetToken)
    user.resetToken = resetToken;
    await user.save()
    // console.log("New user", user);

    const resetUrl = `http://162.240.225.252:3000/resetPassword/${resetToken}`
    const message = forgotMessage(resetUrl, user)
  // console.log("username", user.name, user.email)
    const result = await sendEmail({
      to: user.email,
      username: user.name,
      subject: 'Password Reset Request',
      text: message,
    })

    if ( result ){
      return res.status(200).json({
        message: `An email has been sent to ${email} with further instructions.`,
      })
    }else{
      return res.status(403).json({
        message: `An email has not been sent to ${email}.`,
      })
    }
      
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
});

//@description     Reset the user password
//@route           POST /api/user/resetPassword
//@access          Public
const postResetPassword = asyncHandler (async (req, res) => {
  try {
    const { password, resetToken } = req.body
    console.log(password, resetToken)
    if (!resetToken || !password)
      return res.status(400).json({ error: 'Invalid Request' })

    // Verify reset token
    console.log("token: ", resetToken);
    const user = await User.findOne({ resetToken });
    console.log("user", user)
    if (!user) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    user.password = password
    user.resetToken = undefined

    await user.save()

    res.status(200).json({ message: 'Password has been reset' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
});

export { 
  allUsers,
  registerUser, 
  authUser, 
  GetUserById, 
  updateProfile, 
  updateAdminProfile,
  postForgotPassword,
  postResetPassword,
};
