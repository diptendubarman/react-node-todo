const router = require("express").Router();

router.get("/", async (req, res, next) => {
  res.send({ message: "Awesome it works 🐻 ddddddddddddddddddd" });
});


module.exports = router;
