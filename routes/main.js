const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/gallery", homeController.getGallery);
router.get("/about", homeController.getAbout);
router.get("/services", homeController.getServices);
router.get("/upload", homeController.getUpload);
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/eventinfo/:id", ensureAuth, postsController.getEventInfo);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;

//