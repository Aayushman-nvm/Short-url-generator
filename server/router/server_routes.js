import { Router } from "express";
import { handleUrlGenerator } from "../controller/urlGenerator.js";
import { handleLogin, handleRegister } from "../controller/userRelated.js";
const router = Router();

router.post("/url", handleUrlGenerator);
router.post("/login", handleLogin);
router.post("/register", handleRegister);

export default router;
