const express = require("express");
const {
  getUrl,
  createUrl,
  updateUrl,
  deleteUrl,
  getUrlbyId,
} = require("../controllers/UrlController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getUrl);
router.post("/create",protect, createUrl);
router.put("/update/:id",protect, updateUrl);
router.delete("/delete/:id",protect, deleteUrl);
router.get("/:id",protect, getUrlbyId);


module.exports = router;
