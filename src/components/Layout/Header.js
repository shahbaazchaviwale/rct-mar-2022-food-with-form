import { Fragment } from "react";
import classes from "./Header.module.css";
import mealsImage from "../../Assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton openModal={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A tables full of delicious fod!" />
      </div>
    </Fragment>
  );
};

export default Header;
