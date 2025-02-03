const express = require("express");
const {g} = require("../controller/recipe.controller");

const router = express.Router();

router.post("/", postnewcontract);

router.get("/", getcontract);

router.get("/:id", getidRecipe);



router.put("/:id", editRecipe);

router.delete("/:id", deleteRecipe);

router.get("/search", searchRecipe);

module.exports = router;
