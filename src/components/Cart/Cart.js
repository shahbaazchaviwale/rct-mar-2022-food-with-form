import React, { Fragment, useContext, useState } from "react";
import CardContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CardContext);
  const { items, totalAmount } = cartCtx;
  const isOrderItem = items.length > 0;

  // adding this line to show "CHECKUT" component visibilty
  const [isCheckout, setIscheckout] = useState(false);

  //  visible the content  when sending request as saved
  const [placeOrderInProcess, setPlaceOrderInProcess] = useState(false);
  const [placeOrderIsCompleted, setPlaceOrderIsCompleted] = useState(false);

  const addItemIntoCart = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const removeItemFromCart = (id) => {
    console.log(" id >>", id);
    cartCtx.removeItem(id);
  };

  const cartItem = (
    <ul className={classes["cart-items"]}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={addItemIntoCart.bind(null, item)}
          onRemove={removeItemFromCart.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    setIscheckout(true);
  };

  // sending  form data & passing this as prop to CHECKOUT.js COMPONENT
  const submitHandler = async (formData) => {
    setPlaceOrderInProcess(true);
    await fetch(
      "https://rct-mar-2022-food-form-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          users: formData,
          orderItems: cartCtx.items,
        }),
      }
    );
    setPlaceOrderInProcess(false);
    setPlaceOrderIsCompleted(true);
    cartCtx.clearCart();
    console.log("formData >>", formData);
  };

  const modalActionButton = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {isOrderItem && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const modalContent = (
    <React.Fragment>
      {cartItem}
      <div className={classes.total}>
        {isOrderItem ? (
          <Fragment>
            <span>Total Amount</span>
            <span>{totalAmount.toFixed(2)}</span>
          </Fragment>
        ) : (
          <span>No items added</span>
        )}
      </div>
      {/* line no: 70 and 71 are visible of button */}
      {isCheckout && (
        <Checkout onConfirm={submitHandler} closeModal={props.onClose} />
      )}
      {!isCheckout && modalActionButton}
    </React.Fragment>
  );

  const placeOrderInProgressContent = <p>Your order is placing..</p>;
  const placeOrderIsCompeletedContent = (
    <p>Your order is confirmed, please wait for order close Modal</p>
  );
  return (
    <Modal onCloseModel={props.onClose}>
      {!placeOrderInProcess && !placeOrderIsCompleted && modalContent}
      {placeOrderInProcess && placeOrderInProgressContent}
      {!placeOrderInProcess &&
        placeOrderIsCompleted &&
        placeOrderIsCompeletedContent}
    </Modal>
  );
};

export default Cart;
