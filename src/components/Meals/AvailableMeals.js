import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffects will when component render after bcz its does not
  useEffect(() => {
    const fetchMeal = async () => {
      const response = await fetch(
        "https://rct-mar-2022-food-form-default-rtdb.firebaseio.com/meals.json"
      );
      const responseData = await response.json();

      console.log("responseData >>", responseData);
      const loadedMeals = [];
      // this will object array
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key]["name"],
          description: responseData[key]["description"],
          price: responseData[key]["price"],
        });
      }
      console.log("push>>", loadedMeals);
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    fetchMeal();
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <h2>Loading...</h2>
      </section>
    );
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
