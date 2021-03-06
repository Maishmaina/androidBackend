import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// @desc  Fetch all users
// @route GET /api/v1/users
// @access  Public

const getUsers = async (req, res) => {
  try {
    const result = await User.find().select("-passwordHash");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err, success: false });
  }
};
// @desc  Register a user
// @route POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    isAdmin,
    street,
    apartment,
    zip,
    city,
    country,
  } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: "User already exists" });
  }
  const passwordHash = bcrypt.hashSync(password, 10);
  const user = await User.create({
    name,
    email,
    passwordHash,
    phone,
    isAdmin,
    street,
    apartment,
    zip,
    city,
    country,
  });
  if (user) {
    res.status(201).send(user);
  } else {
    res.status(400).json("Invalid User Data");
  }
};
// @desc  Fetch single users
// @route GET /api/v1/users/:id
// @access  Public

const getSingleUser = async (req, res) => {
  try {
    const result = await User.findById(req.params.id).select("-passwordHash");
    if (!result) {
      res.status(500).json({ message: "No User found with that details" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err, success: false });
  }
};

// @desc    Auth User and login
// @route   POST /api/users/login
// @access  Public

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "User Not Found" });
  }
  if (user && bcrypt.compareSync(password, user.passwordHash)) {
    const token = jwt.sign(
      { userid: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return res.status(200).json({ user: user.email, token });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
};
// @desc Count Number of Users
// @route GET /api/v1/users/get/countUsers
// @access  Private
const countUsers = async (req, res) => {
  try {
    const usersCount = await User.countDocuments((count) => count);
    if (!usersCount) {
      res.status(500).json({ success: false, message: "Users Not Found" });
    }
    res.status(200).send({ usersCount: usersCount });
  } catch (err) {
    console.log(err);
  }
};
// @desc  DELETE user
// @route DELETE /api/v1/users/:id
// @access  Private

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.status(200).json({ success: true, message: "Deleted Deleted" });
  } else {
    res.status(404).json({ success: false, message: "User Not Found" });
  }
};

export {
  getUsers,
  registerUser,
  getSingleUser,
  loginUser,
  countUsers,
  deleteUser,
};
