import { Router } from "express";
import homeHandler from "../controllers/homeHandler.js"
import registerHandler from "../controllers/registerHanlder.js";
import login from "../controllers/loginHandler.js";

const router = Router();

router.route("/").get(homeHandler);
router.route("/register").post(registerHandler);
router.route("/login").post(login);

export default router;