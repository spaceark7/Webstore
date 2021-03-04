import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import tokenGenerator from "../utils/tokenGenerator.js";

// @desc   auth user & get token
// @route  POST /api/users/login
// @access public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: tokenGenerator(user._id),
    });
  } else {
    res.status(401);
    throw new Error("invalid email or password!");
  }
});

// @desc   register user
// @route  POST /api/users/login
// @access public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(401);
    throw new Error("User Already Exist, try different email");
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: tokenGenerator(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data, cannot Create user");
  }
});

// @desc   GET user & get verify token
// @route  GET /api/users/profile
// @access private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// @desc   update user & get verify token
// @route  PUT /api/users/profile
// @access private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: tokenGenerator(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// @desc   GET all users
// @route  GET /api/users
// @access private/admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.json(users);
});

// @desc   Delete user By Id
// @route  DELETE /api/users/:id
// @access private/admin

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: `User ID is removed!` });
  } else {
    res.status(404);
    throw new Error("User Not Found.");
  }
  res.json(users);
});

// @desc   update user By Id
// @route  GET /api/users/:id
// @access private/admin

const getUsersById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User Not Found. Get User By Id");
  }
});

// @desc   update user by ID with admin
// @route  PUT /api/users/:id
// @access private/admin

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found To Update. ");
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUsersById,
  updateUserById,
};
