import { saveToLocalStorage } from "../utils/storageUtils";

export const addToCart = (item) => {
  return (dispatch, getState) => {
    const { cart } = getState();

    const existingItem = cart.items.find(
      (existingItem) => existingItem.product_id === item.product_id
    );

    if (existingItem) {
      // Item with the same product_id already exists, update the quantity
      const updatedCart = cart.items.map((existingItem) =>
        existingItem.product_id === item.product_id
          ? { ...existingItem, quantity: existingItem.quantity + 1 }
          : existingItem
      );

      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { productId: item.product_id, quantity: existingItem.quantity + 1 },
      });

      // Save the updated cart with increased quantity
      saveToLocalStorage('cart', { items: updatedCart });
    } else {
      // Item with the product_id does not exist, add it to the cart
      dispatch({
        type: 'ADD_TO_CART',
        payload: { ...item, quantity: 1 }, // Set quantity to 1 for new items
      });

      const updatedCart = getState().cart.items;

      // Save the updated cart with the added item
      saveToLocalStorage('cart', { items: updatedCart });
    }
  };
};

export const removeFromCart = (itemId) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: itemId,
    });

    const updatedCart = getState().cart.items;

    saveToLocalStorage('cart', { items: updatedCart });
  };
};

export const updateQuantity = (productId, quantity) => {
  return (dispatch, getState) => {
    const { cart } = getState();

    const updatedCart = cart.items.map((item) =>
      item.product_id === productId ? { ...item, quantity: quantity } : item
    );

    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { productId, quantity },
    });

    // Save the updated cart with the new quantity
    saveToLocalStorage('cart', { items: updatedCart });
  };
};

export const decreaseQuantity = (productId) => {
  return (dispatch, getState) => {
    const { cart } = getState();

    const updatedCart = cart.items.map((item) =>
      item.product_id === productId
        ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
        : item
    );

    const updatedCartAfterDecrease = updatedCart.filter(
      (item) => !(item.product_id === productId && item.quantity === 0)
    );

    if (updatedCartAfterDecrease.length !== updatedCart.length) {
      // Remove only one item with the specified productId
      const indexOfRemovedItem = updatedCart.findIndex(
        (item) => item.product_id === productId && item.quantity === 0
      );

      if (indexOfRemovedItem !== -1) {
        dispatch({
          type: 'REMOVE_FROM_CART',
          payload: productId,
        });

        // Save the updated cart without the removed item
        saveToLocalStorage('cart', { items: updatedCartAfterDecrease });
        return;
      }
    }

    // No item was removed, just update the quantity
    dispatch({
      type: 'DECREASE_QUANTITY',
      payload: { productId },
    });

    // Save the updated cart with decreased quantity
    saveToLocalStorage('cart', { items: updatedCartAfterDecrease });
  };
};
