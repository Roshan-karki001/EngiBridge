const express = require("express");
const {getRecipe,getidRecipe,postnewRecipe,editRecipe,deleteRecipe,searchRecipe} = require("../controller/recipe.controller");
const { postnewProject, searchProject } = require("../controller/project_controller");

const router = express.Router();

router.post("/", postnewProject);

router.get("/", getProject);

router.get("/:id", getidProject);



router.put("/:id", editProject);

router.delete("/:id", deleteProject);

router.get("/search", searchProject);

module.exports = router;
