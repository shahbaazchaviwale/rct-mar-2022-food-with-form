import { Fragment, useContext } from "react";
import CardContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CardContext);
  const { items, totalAmount } = cartCtx;
  const isOrderItem = items.length > 0;

  const addItemIntoCart = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const removeItemFromCart = (id) => {
    console.log(' id >>', id);
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
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {isOrderItem && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
