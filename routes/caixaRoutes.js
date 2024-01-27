const router = require("express").Router();

const CaixaController = require("../controllers/caixaController");

const auth = require("../auth");

router.get("/", auth, CaixaController.getAll);
router.get("/:id", auth, CaixaController.getById);
router.post("/", auth, CaixaController.create);
router.put("/:id", auth, CaixaController.updateById);
router.delete("/:id", auth, CaixaController.deleteById);

module.exports = router;