import { Router } from "express";

import verifier from "../middlewares/verifier.js";

import homeHandler from "../controllers/homeHandler.js"

import registerHandler from "../controllers/registerHanlder.js";
import login from "../controllers/loginHandler.js";
import logoutHanlder from "../controllers/logoutHandler.js";

import userHanlder from "../controllers/userHandler.js";
import singerHanlder from "../controllers/singerHandler.js";

import singerRegisterHanlder from "../controllers/singerRegisterHandler.js";
import singerLoginHandler from "../controllers/singerLoginHandler.js";
import singerLogoutHandler from "../controllers/singerLogoutHandler.js";

const router = Router();

router.route("/").get(homeHandler);
router.route("/register").post(registerHandler);
router.route("/login").post(login);
router.route("/users").get(verifier, userHanlder);
router.route("/singers").get(verifier, singerHanlder);
router.route("/logout").get(verifier, logoutHanlder);
router.route("/singerRegister").post(singerRegisterHanlder);
router.route("/singerLogin").post(singerLoginHandler);
router.route("/singerLogout").get(verifier, singerLogoutHandler);

export default router;