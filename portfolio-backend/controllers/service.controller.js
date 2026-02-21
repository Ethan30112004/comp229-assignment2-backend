const Service = require("../models/service.model");
const createError = require("http-errors");

exports.add = async (req, res, next) => {
  try {
    const s = await Service.create(req.body);
    res.json({
      success: true,
      message: "Service added successfully.",
      data: { title: s.title, description: s.description, id: s._id }
    });
  } catch (e) { next(e); }
};

exports.getAll = async (req, res, next) => {
  try {
    const list = await Service.find();
    res.json({
      success: true,
      message: "Services list retrieved successfully.",
      data: list.map(s => ({ title: s.title, description: s.description, id: s._id }))
    });
  } catch (e) { next(e); }
};

exports.getById = async (req, res, next) => {
  try {
    const s = await Service.findById(req.params.id);
    if (!s) return next(createError(404, "Service not found"));
    res.json({
      success: true,
      message: "Service retrieved successfully.",
      data: { title: s.title, description: s.description, id: s._id }
    });
  } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    const s = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!s) return next(createError(404, "Service not found"));
    res.json({ success: true, message: "Service updated successfully." });
  } catch (e) { next(e); }
};

exports.delete = async (req, res, next) => {
  try {
    const s = await Service.findByIdAndDelete(req.params.id);
    if (!s) return next(createError(404, "Service not found"));
    res.json({ success: true, message: "Service deleted successfully." });
  } catch (e) { next(e); }
};