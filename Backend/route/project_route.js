const express = require("express");
const {getProject,getidProject,postnewProject,editProject,deleteProject,searchProject} = require("../controller/recipe.controller");


const router = express.Router();
router.post("/", postnewProject);
router.get("/", getProject);
router.get("/:id", getidProject);
router.put("/:id", editProject);
router.delete("/:id", deleteProject);
router.get("/search", searchProject);

module.exports = router;
