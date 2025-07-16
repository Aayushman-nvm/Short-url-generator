import { Router } from "express";
import { handleUrlGenerator, handleAllUrl, handleLikedUrl, handleAllLikedUrl, handleDeleteUrl } from "../controller/urlGenerator.js";
import { handleLogin, handleRegister } from "../controller/userRelated.js";
const router = Router();

router.post("/url", handleUrlGenerator);
router.post("/history", handleAllUrl);
router.post("/likes", handleLikedUrl);
router.post("/favourites", handleAllLikedUrl);
router.post("/delete",handleDeleteUrl);
router.post("/login", handleLogin);
router.post("/register", handleRegister);

export default router;
