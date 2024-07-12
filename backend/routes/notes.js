const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// ROUTE 1 : Get all the noted using GET : "/api/notes/fetchallnotes"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error.");
  }
});

// ROUTE 2 : Add a note using POST : "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title.").isLength({ min: 3 }),
    body("description", "Description must be atleast 8 characters.").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if there are any errors in validation return them.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNoted = await note.save();
      res.json(savedNoted);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error.");
    }
  }
);

// ROUTE 3 : Update an existing note using PUT : "/api/notes/updatenote". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    //Create a new note object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    //unauthorized access
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error.");
  }
});

// ROUTE 4 : Delete an existing note using DELETE : "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    //unauthorized access
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.send("Note deleted successfully.");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error.");
  }
});

module.exports = router;
