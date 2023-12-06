const router = require("express").Router();

const UserController = require("../controllers/userController");

const auth = require("../auth");

router.get("/", auth, UserController.getAll);
router.get("/:id", auth, UserController.getById);
router.post("/", auth, UserController.create);
router.put("/:id", auth, UserController.updateById);
router.delete("/:id", auth, UserController.deleteById);

module.exports = router;