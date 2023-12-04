const express = require("express");
const router = express.Router();
const User = require('../models/User');

// Create a User using : POST "/api/auth/"  and also doesn't require auth.
// use post method instead of get method of router because of user data is shown in get method but not in post method.
router.post('/', async (req,res)=>{
    console.log(req.body);
    //const user = User(req.body);
    //user.save();
    const user = new User(req.body);
    await user.save();
    console.log("user is saved on database");
    res.json(req.body);
})

module.exports = router;