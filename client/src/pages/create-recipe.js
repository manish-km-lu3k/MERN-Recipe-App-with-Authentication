import React, { useState } from 'react';
import axios from "axios";
import { GetUserID } from '../hooks/useGetUserID';
import { useCookies } from "react-cookie";



export const CreateRecipe = () => {
  const userID = GetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  // console.log('my userID',userID);
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  

  const handleChange = (event) =>{
    const {name, value} = event.target;
    setRecipe({...recipe, [name]: value });
    
  };

  const handleIngredientsChange = (event, idx) =>{
    const { value} = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients });
    
  };

  const addIngredients = () =>{
    setRecipe({...recipe, ingredients: [recipe.ingredients, "" ] });

  };
  // console.log(recipe);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/recipes",
        {...recipe},
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Recipe Created");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='create-recipe'>
      <h2>CreateRecipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input
         type='text' id='name' name='name' onChange={handleChange}/>
        <label htmlFor='ingredients'>Ingredients</label>
        {recipe.ingredients.map((ingredient, idx) =>(
          <input 
          key={idx} 
          type='text' 
          name='ingredients'
          value={ingredient}
          onChange={(event) => handleIngredientsChange(event, idx)}
          />
        ))}
        <button onClick={ addIngredients } type='button'>Add Ingredients</button>
        <label htmlFor='instructions'>Instructions</label>
        <textarea
         id='instructions' name='instructions' onChange={handleChange}></textarea>
        <label htmlFor='imageUrl'>Image URL</label>
        <input
         type='text' id='imageUrl' name='imageUrl' onChange={handleChange}/>
        <label htmlFor='cookingTime'>Cooking Time (minutes)</label>
        <input
         type='number' id='cookingTime' name='cookingTime' onChange={handleChange} />
        <br></br>
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};
