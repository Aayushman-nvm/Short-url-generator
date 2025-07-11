import { Router } from "express";
import { handleUrlGenerator, handleAllUrl } from "../controller/urlGenerator.js";
import { handleLogin, handleRegister } from "../controller/userRelated.js";
const router = Router();

router.post("/url", handleUrlGenerator);
router.post("/history", handleAllUrl);
router.post("/login", handleLogin);
router.post("/register", handleRegister);

export default router;
