const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.set({
        "Cache-Control" : "no-cache",
        "Content-Type" : "application/json"
    });
    res.send(req.session.queries);
});

module.exports = router;