const express = require("express");
const router = express.Router();
const Faculty = require("../models/Faculty");

router.post("/faculty", async (req, res) => {
  console.log("📩 Incoming POST /faculty request");
  console.log("Request body:", req.body);

  try {
    const { name, designation, qualification, salary } = req.body;

    if (!name || !designation || !qualification || !salary) {
      console.log("⚠ Missing required fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    const faculty = new Faculty({ name, designation, qualification, salary });
    await faculty.save();
    console.log("✅ Faculty saved successfully:", faculty);

    res.status(201).json(faculty);
  } catch (error) {
    console.error("❌ Error adding faculty:", error.message);
    res.status(500).json({ message: error.message });
  }
});

router.get("/faculty", async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.json(faculties);
  } catch (error) {
    console.error("❌ Error fetching faculties:", error.message);
    res.status(500).json({ message: error.message });
  }
});

router.put("/faculty/:id", async (req, res) => {
  try {
    const updated = await Faculty.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    console.error("❌ Error updating faculty:", error.message);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/faculty/:id", async (req, res) => {
  try {
    await Faculty.findByIdAndDelete(req.params.id);
    res.json({ message: "Faculty deleted" });
  } catch (error) {
    console.error("❌ Error deleting faculty:", error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;