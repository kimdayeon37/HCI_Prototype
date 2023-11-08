const router = require("express-promise-router")();

const router_api = require("./api");

router.use("/api", router_api);

module.exports = router;
