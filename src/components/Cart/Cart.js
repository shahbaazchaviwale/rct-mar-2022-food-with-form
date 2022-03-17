import { Fragment, useContext, useState } from "react";
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

  return (
    <Modal onCloseModel={props.onClose}>
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
      {isCheckout && <Checkout closeModal={props.onClose} />}
      {!isCheckout && modalActionButton}
    </Modal>
  );
};

export default Cart;
