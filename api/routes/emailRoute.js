const router = require("express").Router();
const EmailController = require("../controllers/EmailController")

router.post("/confirmation", EmailController.sendConfirmationEmail);

router.post('/send-code', EmailController.sendCode);

router.post('/send-resetPassword', EmailController.sendResetPassword);

module.exports = router;