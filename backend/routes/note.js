const express = require("express");
const router = express.Router();
const Note = require("../models/Note"); // importing Note schema
const fetchUser = require("../middleware/fetchUser"); // importing fetchUser middleware to get id from token
const { body, validationResult } = require("express-validator"); // used validator for adding notes so no empty note added in databasew

// route 1: Get all the notes using : GET "/api/note/fetchAllNotes" , login required
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user }); // find all notes where user is id send by middleware
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some internal error occured");
  }
});

// route 2: Add new note using : POST "/api/note/addNote" , login required
// here we set input validation after the fetchUser middleware
router.get(
  "/addNote",
  fetchUser,
  [
    body("title", "Enter proper title").isLength({ min: 4 }),
    body("description", "Minimum length is 8 for description").isLength({ min: 8 }),
  ],
  async (req, res) => {
    // check validation is satisfied or not. If not then send error
    const result = validationResult(req);
    if (!result.isEmpty()) {
      result.array().forEach((e) => console.log(e.msg));
      return res.status(400).send({ errors: result.array() });
    }

    try {
      const { title, description, tag } = req.body; // destructing all keys from req.body object
      const note = new Note({
        user: req.user,
        title, description, tag
      }); // creating a new note with including user id send by fetchUser middleware and saved as user also the title, description and tag from req.body
      const savedNote = await note.save().then(console.log("Note saved sucessfully")); // saving the note in database and wait till saving note
      res.send(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some internal error occured");
    }
  }
);

module.exports = router;
