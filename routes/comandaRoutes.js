const router = require("express").Router();

const ComandaController = require("../controllers/comandaController");

const auth = require("../auth");

router.get("/", auth, ComandaController.getAll);
router.get("/:id", auth, ComandaController.getById);
router.post("/", auth, ComandaController.create);
router.put("/:id", auth, ComandaController.updateById);
router.delete("/", auth, ComandaController.deleteAll);
router.delete("/:id", auth, ComandaController.deleteById);

module.exports = router;