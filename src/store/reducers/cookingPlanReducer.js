import * as cookingPlanActions from '../actions/cookingPlanActions';

const initState = {
    cookingPlan:null
}

const cookingPlanReducer = (state = initState, action) => {

    try {
        switch (action.type){
            //Get cooking plan and store it in global state
            case cookingPlanActions.GET_CP:
                return {
                    ...state,
                    cookingPlan: action.cookingPlan
                }
        }
        
    } catch (error) {
        console.log("Error occurred in cooking plan reducer", error)
    }
    
    //Return state if none of the actions apply
    return state;
};

export default cookingPlanReducer;