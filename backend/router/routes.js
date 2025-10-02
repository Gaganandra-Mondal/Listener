import { Router } from "express";
import verifier from "../middlewares/verifier.js";

// Controllers
import homeHandler from "../controllers/homeHandler.js";
import discoverHandler from "../controllers/discoverHandler.js";
import albumHandler from "../controllers/albumHandler.js";
import registerHandler from "../controllers/registerHandler.js";
import login from "../controllers/loginHandler.js";
import logoutHandler from "../controllers/logoutHandler.js";
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
import songsHandler from "../controllers/songHandler.js";

const router = Router();

// Public routes
router.get("/", homeHandler);
router.get("/allsingers", allsingersHandler);
router.get("/album", albumHandler);
router.get("/topTracks", topTracksHandler);
router.get("/newReleases", newReleasesHandler);

// Protected routes
router.get("/userProfile", verifier, userHandler);
router.get("/singerProfile", verifier, singerHandler);
router.get("/discover", verifier, discoverHandler);
router.get("/recommended", verifier, recomendedHandler);
router.get("/songs/:sid", songsHandler);

// Auth routes
router.post("/userRegister", registerHandler);
router.post("/userLogin", login);
router.get("/userLogout", verifier, logoutHandler);

router.post("/singerRegister", singerRegisterHandler);
router.post("/singerLogin", singerLoginHandler);
router.get("/singerLogout", verifier, singerLogoutHandler);

// Actions
router.post("/songsUpload",
    verifier,
    upload.fields([{ name: "img", maxCount: 1 }, { name: "url", maxCount: 1 }]),
    uploadHandler
);

router.post("/likes/:id", verifier, likeHandler);
router.post("/dislikes/:id", verifier, dislikeHandler);
router.post("/follows/:id", verifier, followHandler);
router.post("/unfollows/:id", verifier, unfollowHandler);

export default router;
