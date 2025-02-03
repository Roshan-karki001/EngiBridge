
const RecipeModel = require("../models/recipedata");

const getRecipe = async (req, res) => {
    try {
        const recipes = await RecipeModel.find();
        res.status(200).json({ success: true, recipes });
    } catch (err) {
        console.error("Error fetching all recipes:", err);
        res.status(500).json({ success: false, error: err.message });
    }
};

const getidRecipe=  async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ success: false, message: 'Recipe not found' });
        }
        res.status(200).json({ success: true, recipe });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const postnewRecipe= async (req, res) => {
    try {
        const { name, time, ingredients, shoppingList, fullCookInfo } = req.body;
        const newRecipe = await RecipeModel.create({ name, time, ingredients, shoppingList, fullCookInfo });
        res.status(201).json({ success: true, message: 'New Recipe added', newRecipe });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const editRecipe=  async (req, res) => {
    try {
        const { name, time, ingredients, shoppingList, fullCookInfo } = req.body;
        const updatedRecipe = await RecipeModel.findByIdAndUpdate(
            req.params.id,
            { name, time, ingredients, shoppingList, fullCookInfo },
            { new: true, runValidators: true }
        );
        if (!updatedRecipe) {
            return res.status(404).json({ success: false, message: 'Recipe not found' });
        }
        res.status(200).json({ success: true, message: 'Recipe updated', updatedRecipe });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const  deleteRecipe= async (req, res) => {
    try {
        const deletedRecipe = await RecipeModel.findByIdAndDelete(req.params.id);
        if (!deletedRecipe) {
            return res.status(404).json({ success: false, message: 'Recipe not found' });
        }
        res.status(200).json({ success: true, message: 'Recipe deleted' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const searchRecipe=  async (req, res) => {
    try {
        const { name, time, ingredients, shoppingList, fullCookInfo } = req.query;

        const query = {};

        if (name) {
            query.name = name;
        }
        if (time) {
            query.time = Number(time);
        }
        if (ingredients) {
            const ingredientsArray = ingredients.split(","); // Convert to an array
            const recipeingredientslist =  RecipeModel.find({ ingredientsList: { $in: ingredientslistArray } });
        }
        if (shoppingList) {
            const shoppingListArray = shoppingList.split(","); // Convert to an array
            const recipeshoppingList =  RecipeModel.find({ shoppingList: { $in: shoppingListArray } });
        }

        const filteredRecipes = await RecipeModel.find(query);

        // If no recipes matched the query
        if (filteredRecipes.length === 0) {
            return res.status(404).json({ success: false, msg: "No recipes matched your query" });
        }

        // Return the filtered recipes
        return res.status(200).json({ success: true, data: filteredRecipes });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, msg: "An error occurred while searching for recipes" });
    }
};


module.exports = {getRecipe,getidRecipe,postnewRecipe,editRecipe,deleteRecipe,searchRecipe};
