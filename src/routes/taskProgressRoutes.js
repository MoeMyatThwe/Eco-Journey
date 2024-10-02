const express = require("express");
const router = express.Router();
const taskProgressController = require("../controllers/taskProgressController");
const userController = require("../controllers/userController");

router.post(
  "/",
  taskProgressController.createNewTaskProgress,
  userController.addPointsToUser
);
router.put("/", taskProgressController.updateTaskProgressById);

module.exports = router;
