const express = require("express");
const {getRecipe,getidRecipe,postnewRecipe,editRecipe,deleteRecipe,searchRecipe} = require("../controller/recipe.controller");

const router = express.Router();

router.get("/", getRecipe);

router.get("/:id", getidRecipe);

router.post("/", postnewRecipe);

router.put("/:id", editRecipe);

router.delete("/:id", deleteRecipe);

router.get("/search", searchRecipe);

module.exports = router;
