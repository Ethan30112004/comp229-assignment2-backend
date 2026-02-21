const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service.controller");

// GET all
router.get("/", serviceController.getAllServices);

// GET by id
router.get("/:id", serviceController.getServiceById);

// POST create
router.post("/", serviceController.createService);

// PUT update
router.put("/:id", serviceController.updateService);

// DELETE
router.delete("/:id", serviceController.deleteService);

module.exports = router;