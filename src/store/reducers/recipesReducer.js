import * as recipesActions from '../actions/recipesActions';

const initState = {
    recipes:null
}

const recipesReducer = (state = initState, action) =>{

    try {
        switch (action.type){

            //Get recipes from the API and store them in the global state
            case recipesActions.GET_RECIPES:
                return {
                    ...state,
                    recipes: action.recipes
                }
    
            //Add recipe to the global state
            case recipesActions.ADD_RECIPE:
                return {
                    ...state,
                    recipes: state.recipes.concat(action.newRecipeData)
                }
    
            //Modify recipe in the global state
            case recipesActions.PUT_RECIPE:
                
                const recipeIndex = state.recipes.findIndex((recipe)=>{
                    return recipe.id === action.recipeData.id
                })
    
                const newRecipeArray = [...state.recipes]
    
                newRecipeArray[recipeIndex] = action.recipeData
                
    
                return {
                    ...state,
                    recipes: newRecipeArray
                }
    
            //Delete recipe from the global state
            case recipesActions.DELETE_RECIPE:
                
                return {
                    ...state,
                    recipes: state.recipes.filter((recipe)=>{
                        return(
                            recipe.id !== action.recipeId
                        )
                    })
                }
        }
        
    } catch (error) {
        console.log("Error ocurred in recipes reducer", error)
    }
    

    //Return state if none of the actions apply
    return state;
};

export default recipesReducer;