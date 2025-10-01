//? imports 
import { Router } from "express";
import express from "express";

import verifier from "../middlewares/verifier.js";

// imoprts of controllers

import homeHandler from "../controllers/homeHandler.js"

import registerHandler from "../controllers/registerHanlder.js";
import login from "../controllers/loginHandler.js";
import logoutHanlder from "../controllers/logoutHandler.js";

import userHandler from "../controllers/userHandler.js";
import singerHandler from "../controllers/singerHandler.js";
import allsingersHandler from "../controllers/allsingersHandler.js";

import singerRegisterHandler from "../controllers/singerRegisterHandler.js";
import singerLoginHandler from "../controllers/singerLoginHandler.js";
import singerLogoutHandler from "../controllers/singerLogoutHandler.js";

import { upload } from "../controllers/uploadHandler.js";
import uploadHandler from "../controllers/uploadHandler.js";

import likeHandler from "../controllers/likeHandler.js";
import dislikeHandler from "../controllers/dislikeHandler.js";

import followHandler from "../controllers/followHandler.js";
import unfollowHandler from "../controllers/unfollowHandler.js";
import topTracksHandler from "../controllers/topTracksHandler.js";
import newReleasesHandler from "../controllers/newReleasesHandler.js";
import recomendedHandler from "../controllers/recomendedHandler.js";

const router = Router();

//? Api routes exposed to the frontend.
router.route("/").get(homeHandler);

router.route("/register").post(express.json(), registerHandler);
router.route("/login").post(express.json(), login);
router.route("/logout").get(verifier, logoutHanlder);

router.route("/users").get(verifier, userHandler);
router.route("/singers").get(verifier, singerHandler);
router.route("/allsingers").get(allsingersHandler);

router.route("/singerRegister").post(express.json(), singerRegisterHandler);
router.route("/singerLogin").post(express.json(), singerLoginHandler);
router.route("/singerLogout").get(verifier, singerLogoutHandler);

router.route("/songsUpload").post(verifier, upload.fields([{ name: 'img', maxCount: 1 }, { name: 'url', maxCount: 1 }]),uploadHandler);

router.route("/likes/:id").post(verifier, express.json(), likeHandler);
router.route("/dislikes/:id").post(verifier, express.json(), dislikeHandler);

router.route("/follows/:id").post(verifier, express.json(), followHandler);
router.route("/unfollows/:id").post(verifier, express.json(), unfollowHandler);
router.route("/topTracks").get(topTracksHandler);
router.route("/newReleases").get(newReleasesHandler);
router.route("/recomended").get(verifier,recomendedHandler);

export default router;