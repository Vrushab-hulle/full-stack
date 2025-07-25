import axios from "axios";
import { useEffect, useState } from "react";

const Meals = () => {
  const [meal, setMeal] = useState([]);

  useEffect(() => {
    async function getMeals() {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood"
      );
      console.log(response);
      setMeal(response.data.meals);
    }
    getMeals();
  }, []);
  return (
    <div className="w-full">
      {meal.map(({ strMeal, strMealThumb, idMeal }) => (
        <div className="flex flex-col w-full">
          <div className="w-[150px]">
            <img src={strMealThumb} alt={strMeal} />
          </div>
          <div className="flex">
            <p className="text-red-500">{strMeal}</p>
            <p>{idMeal}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Meals;
