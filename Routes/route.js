const express = require("express");
const router = express.Router();
const controllerAuth = require("../controller/userControl");
const controllerEmp = require("../controller/empControl");
const controllerAppointment = require("../controller/appointmentControl");
const auth = require("../middleware/Auth");

router.post("/user/signup", controllerAuth.signup);

router.post("/user/login", controllerAuth.login);

router.post("/user/forgetpass", controllerAuth.forgetPassword);

router.post("/user/changepass", controllerAuth.changePassword);

router.post("/emp/register", controllerEmp.register);

router.post("/emp/login", controllerEmp.login);

router.post("/user/appointment",auth,controllerAppointment.makeAppo)

module.exports = router;