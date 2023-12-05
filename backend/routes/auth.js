const express = require("express");
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require("express-validator");

// Create a User using : POST "/api/auth/"  and also doesn't require auth.
// use post method instead of get method of router because of user data is shown in get method but not in post method.
router.post('/',[
    body('name', "Enter proper name").isLength({min: 4}),
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Minimum length is 8 for password').isLength({min: 8})
], async (req,res)=>{
    console.log(req.body);
    const result = validationResult(req);
    if (result.isEmpty()) {
        const user = new User(req.body);
        await user.save().catch(err=> console.log(err)).then(console.log("user is saved on database"));
        //res.json(req.body);
      return res.send(req.body);
    }

    result.array().forEach(e=> console.log(e.msg));
    res.status(400).send({ errors: result.array() });
})

module.exports = router;