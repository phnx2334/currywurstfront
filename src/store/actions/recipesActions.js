import * as recipesApi from '../../Components/Recipes/RecipesApi' 

//DEFINE THE ACTIONS TO TRIGGER
export const GET_RECIPES = 'GET_RECIPES';
export const ADD_RECIPE = 'ADD_RECIPE';
export const PUT_RECIPE = 'PUT_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';



//GET RECIPES-------------------------------------------------
export const getRecipes = (recipes)=>{
    
    return{
        type:GET_RECIPES,
        recipes:recipes
    };
};

export const dispatchGetRecipes = () =>{
    return async (dispatch) =>{
        const recipesData = await recipesApi.getRecipes();
        //Add corresponding ingredients to the recipe
        try {
            const recipesWithIngredients = await Promise.all(recipesData.map(async (recipe)=>{
                const recipeIngredients = await recipesApi.getRecipeIngredients(recipe.name);

                    recipe = {...recipe, ingredients:[...recipeIngredients.ingredientsList]}    
                    return recipe;   
            }));

            dispatch(getRecipes(recipesWithIngredients));
          } catch(err) {
            console.log("An error ocurred while obtaining the ingredients", err);
          }  
    }
};

//ADD RECIPES-------------------------------------------------
export const addRecipe = (recipeData) =>{
    return {
        type:ADD_RECIPE,
        newRecipeData:recipeData
    }
};

export const dispatchAddRecipe = (recipeData) =>{
    return async (dispatch) =>{
        const data = await recipesApi.addRecipe(recipeData)
        dispatch(addRecipe(data));
    }
}

//MODIFY RECIPES-------------------------------------------------
export const modifyRecipe = (recipeData) =>{
    return {
        type:PUT_RECIPE,
        recipeData:recipeData
    }
};

export const dispatchModifyRecipe = (recipeId, recipeData) =>{
    return async (dispatch) =>{
        const data = await recipesApi.updateRecipe(recipeId,recipeData)
        try {
            const recipesWithIngredients = await Promise.all(data.map(async (recipe)=>{
                const recipeIngredients = await recipesApi.getRecipeIngredients(recipe.name);
                    recipe = {...recipe, ingredients:[...recipeIngredients.ingredientsList]}    
                    return recipe;   
            }));

            dispatch(modifyRecipe(recipesWithIngredients));
          } catch(err) {
            console.log("An error ocurred while obtaining the ingredients", err);
          }  

    }
}


//DELETE RECIPES
export const deleteRecipe = (id) =>{
    return {
        type:DELETE_RECIPE,
        recipeId:id
    }
};

export const dispatchDeleteRecipe = (recipeId) =>{
    return async (dispatch) =>{
        const data = await recipesApi.deleteRecipe(recipeId)
        if(data === 'OK'){
            dispatch(deleteRecipe(recipeId))
        }
    }
}