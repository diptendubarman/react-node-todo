const router = require("express").Router();

router.get("/", async (req, res, next) => {
  res.send({ message: "Awesome it works 🐻 deepdev" });
});


module.exports = router;
