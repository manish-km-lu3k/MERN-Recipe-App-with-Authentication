import React, { useEffect, useState } from 'react';
import {GetUserID} from '../hooks/useGetUserID';
import { useNavigate } from "react-router-dom";
import axios from "axios";


export const SavedRecipe = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = GetUserID();
  const navigate = useNavigate();

  useEffect( () => {

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`);
        setSavedRecipes(response.data.savedRecipes);
        // console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipe();
  },[]);
  
  //------remove recipe-------------
  const removeRecipe =  async (recipeId) => {
    try {
      await axios.delete(`http://localhost:3001/recipes/savedRecipes/${userID}/${recipeId}`);

      setSavedRecipes((prevSavedRecipes) =>
        prevSavedRecipes.filter((recipe) => recipe._id !== recipeId)
      );
      // console.log('savedRecipes',savedRecipes);
      
    } catch (err) {
      console.log(err);
    }
    
  };

  return <div>
    <h2>SavedRecipes</h2>
    <ul>
      {savedRecipes.map((recipe) => (
        <li key={recipe._id}>
          <div>
            <h2>{recipe.name}</h2>z
          </div>
          <div className='instructions'>
            <p>{recipe.instructions}</p>
          </div>
          <img src={recipe.imageUrl} alt={recipe.name} />
          <p>Cooking Time: {recipe.cookingTime}(minutes)</p>
          <button  onClick={() => removeRecipe(recipe._id)} >Remove</button>
        </li>
      ))}
    </ul>
  </div>;
};
