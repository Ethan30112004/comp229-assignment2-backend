const Reference = require("../models/reference.model");

exports.add = async (req, res, next) => {
  try {
    const ref = await Reference.create(req.body);

    res.json({
      success: true,
      message: "Reference added successfully.",
      data: {
        firstname: ref.firstname,
        lastname: ref.lastname,
        email: ref.email,
        position: ref.position,
        company: ref.company,
        id: ref._id
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const refs = await Reference.find();

    res.json({
      success: true,
      message: "References list retrieved successfully.",
      data: refs.map(r => ({
        firstname: r.firstname,
        lastname: r.lastname,
        email: r.email,
        position: r.position,
        company: r.company,
        id: r._id
      }))
    });
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const ref = await Reference.findById(req.params.id);
    if (!ref) throw require("http-errors")(404, "Reference not found");

    res.json({
      success: true,
      message: "Reference retrieved successfully.",
      data: {
        firstname: ref.firstname,
        lastname: ref.lastname,
        email: ref.email,
        position: ref.position,
        company: ref.company,
        id: ref._id
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    await Reference.findByIdAndUpdate(req.params.id, req.body);

    res.json({
      success: true,
      message: "Reference updated successfully."
    });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    await Reference.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Reference deleted successfully."
    });
  } catch (err) {
    next(err);
  }
};