const express = require("express");
const router = express.Router();
const cAuth = require("../controllers");

router.post("/user/register", cAuth.register.register);
router.post("/user/login", cAuth.login.login);
router.put("/user/update/:id", cAuth.update.updateName);
router.put("/user/update-username/:id", cAuth.update.updateUsername);
router.delete("/user/delete/:id", cAuth.destroy.destroy);
router.get("/user/get/", cAuth.getAll.getAll);
router.get("/user/get/:id", cAuth.getOne.getOne);

module.exports = router;