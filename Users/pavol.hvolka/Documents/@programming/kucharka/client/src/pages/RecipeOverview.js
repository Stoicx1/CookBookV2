
import React, {useState, useEffect} from 'react'
import ReactHtmlParser from 'react-html-parser'; 
import { useParams } from 'react-router-dom';
import Ingredients from '../components/Ingredients';

const RecipeOverview = () => {

  // *********************************************************************************
  // * UseStates
  // *********************************************************************************
  const [recipe, SetRecipe] = useState([])
  const [refreshBit, SetRefreshBit] = useState(false)
  const [recipeLoaded, SetRecipeLoaded] = useState(false)
  const { id } = useParams();

  // *********************************************************************************
  // * Get Request / Get recibe by :id param 
  // *********************************************************************************
  
  useEffect(() => {
    fetch('http://localhost:5000/RecipeOverview/' + id)
      .then(res => res.json())
      .then(data => {
        SetRecipe(data)
      })
  }, [])

  useEffect(() => {
    fetch('http://localhost:5000/RecipeOverview/' + id)
      .then(res => res.json())
      .then(data => {
        SetRecipe(data)
        SetRefreshBit(false)
      })
  }, [refreshBit])

  // *********************************************************************************
  // * POST Req - Update like_cnt couter in mongodb
  // *********************************************************************************
  const LikeRecept = async () => {
    // Post request options
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          like_cnt: recipe.like_cnt+1
        })
    };
    // Fetch post request
    fetch('http://localhost:5000/like-recipe/'+recipe._id, requestOptions)
      .then(() => {
        SetRefreshBit(true)
      })
  }  

  // *********************************************************************************
  // * POST Req - Delete recept from mongoDB
  // *********************************************************************************
  const DeleteRecept = () => {
    if (window.confirm('Do you realy want to remove this recipe?')) {
      // Post request options
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      };
      // Fetch post request
      fetch('http://localhost:5000/recipe/'+recipe._id, requestOptions)
        .then(window.location.assign('/'))
    } else {
      // nothing
    }
  } 

  // *********************************************************************************
  // * POST Req - Update recept from mongoDB
  // *********************************************************************************
  const UpdateRecept = () => {
    
  } 

  // *********************************************************************************
  // * Render page / View of choosen recipe from the main list 
  // *********************************************************************************
  return (
    <div className='container-content overview' > 
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>

      <h1>{recipe.name}</h1>
      <h2>{recipe.subname}</h2>
      <br></br>

      <div className='container-main'>
        
        <div className='left'>
          {/* image */}
          <div className='container-img'>
            <img src={recipe.image} alt={recipe.name} ></img>
          </div>
          {/* params of recipe */}
          <div  className='container-icons'>
            <div className='container-icon'>
              <i className="material-icons">&#xe855;</i>
              <div>{recipe.duration+'min'}</div>
            </div>
            <div className='container-icon'>
              <i class="material-icons">&#xe8dc;</i>
              <div>{recipe.like_cnt}</div>
            </div>
            <div className='container-icon'>
              <i className="material-icons">&#xea3c;</i>
              <div>{recipe.difficulty}</div>
            </div>
          </div>
        </div>

        <div className='right'>
          {/* Show recipe description from HTML format / Parsing data */}
          <div>
            <p>{ ReactHtmlParser(recipe.describtion) }</p>
          </div>
          {/* Show recipe description from HTML format / Parsing data */}
          <div className='btn'>
            <button onClick={event => LikeRecept()} >Like</button>
          </div>
          <div className='btn'>
            <button onClick={event => DeleteRecept()} >Delete</button>
          </div>
          <div className='btn'>
            <button onClick={event => UpdateRecept()} >Update</button>
          </div>
        </div>

      </div>

      

      {/* Ingrediencie */}
      <div>
        <Ingredients recept={recipe} />
      </div>

    </div>
  )
}

export default RecipeOverview
