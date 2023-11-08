const router = require("express-promise-router")();
const controller = require("../../controller/controller.api");

router.get("/", controller.main);
router.post("/check", controller.check);

module.exports = router;
