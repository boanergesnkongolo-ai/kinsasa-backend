// routes/reports.js
const express = require("express");
const router = express.Router();
const Report = require("../models/Report");
const admin = require("firebase-admin");

// GET all reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    console.error("GET /api/reports error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// POST create report
router.post("/", async (req, res) => {
  try {
    const { title, description, location } = req.body;
    if (!title || !description) return res.status(400).json({ message: "title and description required" });

    const newReport = new Report({ title, description, location });
    await newReport.save();

    // Optional: send notification via Firebase (if configured)
    if (admin.apps.length) {
      // example: send to a topic 'reports' — frontend must subscribe
      const message = {
        notification: { title: "Nouveau signalement", body: title },
        topic: "reports"
      };
      admin.messaging().send(message).catch(e => console.error("Firebase send error:", e.message));
    }

    res.status(201).json(newReport);
  } catch (err) {
    console.error("POST /api/reports error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// PATCH update status
router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    if (!["nouveau","en cours","traité"].includes(status)) return res.status(400).json({ message: "Invalid status" });

    const updated = await Report.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updated) return res.status(404).json({ message: "Report not found" });

    // Optional: notify users about status change
    if (admin.apps.length) {
      const message = {
        notification: { title: "Statut mis à jour", body: `Signalement "${updated.title}" -> ${status}` },
        topic: "reports"
      };
      admin.messaging().send(message).catch(e => console.error("Firebase send error:", e.message));
    }

    res.json(updated);
  } catch (err) {
    console.error("PATCH /api/reports/:id error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
