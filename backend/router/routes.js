import { Router } from "express";
import homeHandler from "../controllers/homeHandler.js"

const router = Router();

router.route("/").get(homeHandler);

export default router;