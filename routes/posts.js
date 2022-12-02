const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPersonalEvent)
//ask why /post/:id doesn't work ---!!!!!!!!!
//it had the /post automagically
router.post("/createPost", upload.single("file"), postsController.createPost)
router.get("/edit/:id", postsController.getEdit)
router.put("/edit", postsController.editEvent)
router.put("/requests", postsController.sendRequest)
router.put("/accept", postsController.accept)
router.delete("/deletePost", postsController.deletePost)

module.exports = router;
