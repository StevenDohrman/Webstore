import { saveToLocalStorage, getFromLocalStorage } from "../utils/storageUtils";

const initialCartState = {
  items: getFromLocalStorage('cart')?.items || [],
};

const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const updatedAddState = {
        ...state,
        items: [...state.items, action.payload],
      };
      saveToLocalStorage('cart', { items: updatedAddState.items });
      return updatedAddState;

      case 'REMOVE_FROM_CART':
        const updatedRemoveState = {
          ...state,
          items: state.items.filter((item) => item.product_id !== action.payload),
        };
        saveToLocalStorage('cart', { items: updatedRemoveState.items });
        return updatedRemoveState;
      
      case 'DECREASE_QUANTITY':
        const updatedDecreaseQuantityState = {
          ...state,
          items: state.items.map((item) =>
            item.product_id === action.payload.productId
              ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
              : item
          ),
        };
        saveToLocalStorage('cart', { items: updatedDecreaseQuantityState.items });
        return updatedDecreaseQuantityState;
      
      case 'UPDATE_QUANTITY':
        const updatedQuantityState = {
          ...state,
          items: state.items.map((item) =>
            item.product_id === action.payload.productId
              ? { ...item, quantity: action.payload.quantity }
              : item
          ),
        };
        saveToLocalStorage('cart', { items: updatedQuantityState.items });
        return updatedQuantityState;
      default: 
        return state;
  }
};

export default cartReducer;
