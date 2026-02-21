const Project = require("../models/project.model");

exports.add = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);

    res.json({
      success: true,
      message: "Project added successfully.",
      data: {
        title: project.title,
        completion: project.completion,
        description: project.description,
        id: project._id
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const projects = await Project.find();

    res.json({
      success: true,
      message: "Projects list retrieved successfully.",
      data: projects.map(p => ({
        title: p.title,
        completion: p.completion,
        description: p.description,
        id: p._id
      }))
    });
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) throw require("http-errors")(404, "Project not found");

    res.json({
      success: true,
      message: "Project retrieved successfully.",
      data: {
        title: project.title,
        completion: project.completion,
        description: project.description,
        id: project._id
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    await Project.findByIdAndUpdate(req.params.id, req.body);

    res.json({
      success: true,
      message: "Project updated successfully."
    });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    await Project.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Project deleted successfully."
    });
  } catch (err) {
    next(err);
  }
};