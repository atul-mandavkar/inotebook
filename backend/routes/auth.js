const express = require("express");
const router = express.Router();

router.get('/', (req,res)=>{
    res.json({name: "atul", age: 30});
})

module.exports = router;