const router = require("express").Router();

const ProdutoController = require("../controllers/produtoController");

const auth = require("../auth");

router.get("/", auth, ProdutoController.getAll);
router.get("/:id", auth, ProdutoController.getById);
router.post("/", auth, ProdutoController.create);
router.put("/:id", auth, ProdutoController.updateById);
router.delete("/:id", auth, ProdutoController.deleteById);

module.exports = router;