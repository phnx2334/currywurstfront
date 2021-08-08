import * as cookingPlanApi from '../../Components/CookingPlan/CookingPlanApi'

//DEFINE THE ACTIONS TO TRIGGER
export const GET_CP = 'GET_CP';
export const ADD_CP = 'ADD_CP';
export const PUT_CP = 'PUT_CP';
export const DELETE_CP = 'DELETE_CP';


//GET COOKING PLAN--------------------------
export const getCookingPlan = (cookingPlan)=>{
    return{
        type:GET_CP,
        cookingPlan:cookingPlan
    };
};

export const dispatchGetCookingPlan = () =>{
    return async (dispatch) =>{
        const cookingPlanData = await cookingPlanApi.getCookingPlan();
        dispatch(getCookingPlan(cookingPlanData))
    }
};