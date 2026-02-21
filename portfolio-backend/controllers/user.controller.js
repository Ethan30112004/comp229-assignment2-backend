const User = require("../models/user.model");

exports.add = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    res.json({
      success: true,
      message: "User added successfully.",
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        created: user.created,
        updated: user.updated,
        id: user._id
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const users = await User.find();

    res.json({
      success: true,
      message: "Users list retrieved successfully.",
      data: users.map(u => ({
        firstname: u.firstname,
        lastname: u.lastname,
        email: u.email,
        password: u.password,
        created: u.created,
        updated: u.updated,
        id: u._id
      }))
    });
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw require("http-errors")(404, "User not found");

    res.json({
      success: true,
      message: "User retrieved successfully.",
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        created: user.created,
        updated: user.updated,
        id: user._id
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    req.body.updated = new Date();
    await User.findByIdAndUpdate(req.params.id, req.body);

    res.json({
      success: true,
      message: "User updated successfully."
    });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "User deleted successfully."
    });
  } catch (err) {
    next(err);
  }
};