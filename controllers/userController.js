import User from "../models/userModel.js";

// @desc  Fetch all users
// @route GET /api/v1/users
// @access  Public

const getUsers = async (req, res) => {
  try {
    const result = await User.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err, success: false });
  }
};

export { getUsers };
