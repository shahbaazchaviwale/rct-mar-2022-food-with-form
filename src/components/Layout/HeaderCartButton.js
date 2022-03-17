import { useContext, useEffect, useState } from "react";
import CardContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CardContext);
  const { items } = cartCtx;
  const [isButtonHighlighted, setIsButtonHighlighted] = useState(false);

  const btnClasses = `${classes.button} ${isButtonHighlighted ? classes.bump : ''}`;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return parseInt(curNumber) + parseInt(item.amount);
  }, 0);

  useEffect(() => {
    if(items.length === 0){
      return;
    }
    setIsButtonHighlighted(true);
    const timer = setTimeout(() => {
      setIsButtonHighlighted(false)
    }, 300);

    return() =>{
      clearTimeout(timer)
    }
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.openModal}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
