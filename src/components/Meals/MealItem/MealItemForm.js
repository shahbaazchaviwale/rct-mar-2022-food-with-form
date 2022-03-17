import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amounInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = amounInputRef.current.value;
    const enteredAmountNumber = +enteredAmount
    
    if ( enteredAmountNumber < 1 || enteredAmountNumber > 5) {
      setAmountIsValid(false);
      return;
    }
    props.onAddCart(enteredAmount);
    setAmountIsValid(true);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amounInputRef}
        label="amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "1",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <span>Please enter valid amount(1-5)</span>}
    </form>
  );
};

export default MealItemForm;
