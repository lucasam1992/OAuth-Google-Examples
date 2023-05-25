"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const authController_1 = require("../controller/authController");
router.route("/google-auth").get(authController_1.auth);
router.route(`/google-auth-callback`).get(authController_1.authCallback);
exports.default = router;
