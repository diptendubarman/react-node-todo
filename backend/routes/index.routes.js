const router = require("express").Router();

router.use("/api/v1", require("./api.routes.js"));
router.use("/", require("./web.routes.js"));

module.exports = router;
