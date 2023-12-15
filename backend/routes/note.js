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
router.post(
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


// route 3: Update the existing note using : PUT "/api/note/updateNote/:id" , login required and :id is id of not which we want to update
// Here we also check whether the id of user and user id of note is same or not, so that no other user can change another user's note.
// fetchUser middleware gave us id directly in req.user form , collected from token send in header of request.
router.put("/updateNote/:id", fetchUser, async (req, res)=> {
  let note = {};
  try {
    note = await Note.findById(req.params.id); // Finding the note from Note database using id mentioned in request as parameter like /updateNote/:id
  } catch (error) { // If note not availabel then send error, we used try catch because some time wrong params id make problem
    return res.status(404).send("Not Found");
  }
  
  if(note.user.toString() !== req.user){ // Checking wheter id get from middleware fetchUser and user id of note from Note databse is same or not. If not same then send error.
    return res.status(401).send("Not Allowed to change");
  }

  const {title, description, tag} = req.body; // Destructuring all inputs from request body object.

  // to update a note we used findByIdAndUpdate() method available for schema database.In this method first parameter is id of note to be change, second parameter is that object which will set as update in place of original object , third parameter is setting new value current variable (which is optional and if we not set then it will give us old value before updation in variable but change happened in database).
  // then() method is also used for giving response to console that note is updated.
  note = await Note.findByIdAndUpdate(req.params.id, {title, description, tag}, {new: true}).then(console.log("note updated"));
  // Another way is that {$set: newNote} in place of second parameter of findByIdAndUpdate method, but for that before using it we have to create a new variable named newNote as empty object and gave value title, description and tag to that object but this will increase the code.

  res.send(note);
  
});


module.exports = router;
