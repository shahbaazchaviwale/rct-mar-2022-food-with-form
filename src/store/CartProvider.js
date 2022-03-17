import { useReducer } from "react";
import { constantType } from "../constant/constant";
import CardContext from "./cart-context";

// add reducer
// step - 1 create default state
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

//step-2 - reducer funtion
const cartReducer = (state, action) => {
  if (action.type === constantType.ADD_ITEM) {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    
    const existingCartItem = state.items[existingCartItemIndex];

    let updateItems;

    if (existingCartItem) {
      const updateItem = {
        ...existingCartItem,
        amount:
          parseInt(existingCartItem.amount) + parseInt(action.item.amount),
      };

      updateItems = [...state.items];
      updateItems[existingCartItemIndex] = updateItem;

    } else {
      updateItems = state.items.concat(action.item);
    }
    return {
      items: updateItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === constantType.REMOVE_ITEM) {

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updateItems;

    if (existingItem.amount === 1) {
      updateItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updateItem = { ...existingItem, amount: existingItem.amount - 1 };
      updateItems = [...state.items];
      updateItems[existingCartItemIndex] = updateItem;
    }
    return {
      items: updateItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  //step-3 - use useReducer() & use destructure
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (argItem) => {
    dispatchCartAction({ type: constantType.ADD_ITEM, item: argItem });
  };
  const removeItemFromCartHandler = (argId) => {
    dispatchCartAction({ type: constantType.REMOVE_ITEM, id: argId });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CardContext.Provider value={cartContext}>
      {props.children}
    </CardContext.Provider>
  );
};

export default CartProvider;
