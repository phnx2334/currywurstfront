import * as menuItemsApi from '../../Components/MenuItems/MenuItemsApi'

//DEFINE THE ACTIONS TO TRIGGER
export const GET_MENU_ITEMS = 'GET_MENU_ITEMS';
export const ADD_MENU_ITEM = 'ADD_MENU_ITEM';
export const PUT_MENU_ITEM = 'PUT_MENU_ITEM';
export const DELETE_MENU_ITEM = 'DELETE_MENU_ITEM';



//GET MENU ITEMS--------------------------
export const getMenuItems = (menuItems)=>{
    return{
        type:GET_MENU_ITEMS,
        menuItems:menuItems
    };
};

export const dispatchGetMenuItems = () =>{
    return async (dispatch) =>{
        const menuItemsData = await menuItemsApi.getMenuItems();
        dispatch(getMenuItems(menuItemsData));
    }
};

//ADD MENU ITEM-------------------------
export const addMenuItem = (menuItem)=>{
    return{
        type:ADD_MENU_ITEM,
        menuItem:menuItem
    };
};

export const dispatchAddMenuItem = (menuItem) =>{
    return async (dispatch) =>{
        const menuItemData = await menuItemsApi.addMenuItem(menuItem);
        dispatch(addMenuItem(menuItemData));
    }
};

//DELETE MENU ITEM
export const deleteMenuItem = (id) =>{
    return {
        type:DELETE_MENU_ITEM,
        menuItemId:id
    }
};

export const dispatchDeleteMenuItem = (menuItemId) =>{
    return async (dispatch) =>{
        
        const data = await menuItemsApi.deleteMenuItem(menuItemId);
        
        if(data === 'OK'){
            dispatch(deleteMenuItem(menuItemId));
        }
    }
}