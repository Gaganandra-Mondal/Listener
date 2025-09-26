//? imports 
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

import likeHandler from "../controllers/likeHandler.js";
import dislikeHandler from "../controllers/dislikeHandler.js";

import followHandler from "../controllers/followHandler.js";
import unfollowHandler from "../controllers/unfollowHandler.js";

const router = Router();

//? Api routes exposed to the frontend.
router.route("/").get(homeHandler);

router.route("/register").post(registerHandler);
router.route("/login").post(login);
router.route("/logout").get(verifier, logoutHanlder);

router.route("/users").get(verifier, userHanlder);
router.route("/singers").get(verifier, singerHanlder);

router.route("/singerRegister").post(singerRegisterHanlder);
router.route("/singerLogin").post(singerLoginHandler);
router.route("/singerLogout").get(verifier, singerLogoutHandler);

router.route("/likes/:id").post(verifier, likeHandler);
router.route("/dislikes/:id").post(verifier, dislikeHandler);

router.route("/follows/:id").post(verifier, followHandler);
router.route("/unfollows/:id").post(verifier, unfollowHandler);

export default router;