const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

// Create a User using : POST "r/api/auth/createUser"  and also doesn't require auth. where createUser is in api/auth
// use post method instead of get method of router because of user data is shown in get method but not in post method.
router.post(
  "/createUser",
  [
    body("name", "Enter proper name").isLength({ min: 4 }),
    body("email", "Enter valid email").isEmail(),
    body("password", "Minimum length is 8 for password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    console.log(req.body);
    const result = validationResult(req);
    if (!result.isEmpty()) {
      result.array().forEach((e) => console.log(e.msg));
      return res.status(400).send({ errors: result.array() });  
    }

    try{
      const isUser = await User.findOne({email: req.body.email}); // to find the user with same email already exist or not
    //console.log(isUser);
    if(isUser){
      console.log("Email alredy exists");
      return res.status(400).send({error: "Email already exists"})
    }
    const user = new User(req.body);
    await user
      .save()
      .catch((err) => console.log(err))
      .then(console.log("user is saved on database"));
    return res.send(req.body);
    }
    catch(error){
      console.error(error.message);
      res.status(500).send("some error occured");
    }
    
  }
);

module.exports = router;
