import * as menuItemsActions from '../actions/menuItemsActions';

const initState = {
    menuItems:null
}

const menuItemsReducer = (state = initState, action) => {

    try {

        switch (action.type){
            //Get menu items from the API store them in global state
            case menuItemsActions.GET_MENU_ITEMS:
                return {
                    ...state,
                    menuItems: [...action.menuItems]
                }  
    
            //Add a menu item to the global state
            case menuItemsActions.ADD_MENU_ITEM:
                return {
                    ...state,
                    menuItems: state.menuItems.concat(action.menuItem)
                }
    
            //Delete menu item from the global state
            case menuItemsActions.DELETE_MENU_ITEM:
                return {
                    ...state,
                    menuItems: state.menuItems.filter((menuItem)=>{
                        return(
                            menuItem.id !== action.menuItemId
                        )
                    })
                }
        }
        
    } catch (error) {
        console.log("Error ocurred in menu items reducer", error)
    }
    
    
    //Return state if none of the actions apply
    return state;
};

export default menuItemsReducer;