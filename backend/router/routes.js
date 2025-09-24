import { Router } from "express";

import verifier from "../middlewares/verifier.js";

import homeHandler from "../controllers/homeHandler.js"

import registerHandler from "../controllers/registerHanlder.js";
import login from "../controllers/loginHandler.js";
import logoutHanlder from "../controllers/logoutHandler.js";

import userHanlder from "../controllers/userHandler.js";
import singerHanlder from "../controllers/singerHandler.js";

const router = Router();

router.route("/").get(homeHandler);
router.route("/register").post(registerHandler);
router.route("/login").post(login);
router.route("/users").get(verifier, userHanlder);
router.route("/singers").get(verifier, singerHanlder);
router.route("/logout").get(verifier, logoutHanlder);

export default router;