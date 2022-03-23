
import React, {useState, useEffect} from 'react'
import ReactHtmlParser from 'react-html-parser'; 
import { useParams } from 'react-router-dom';

const RecipeOverview = () => {

  // *********************************************************************************
  // * UseStates
  // *********************************************************************************
  const [recipe, SetRecipe] = useState([])
  const [refreshBit, SetRefreshBit] = useState(false)
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
  
  const LikeMe = async () => {
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
  // * Render page / View of choosen recipe from the main list 
  // *********************************************************************************
  return (
    <div className='container-content overview' > 
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>

      <h2>{recipe.name}</h2>
      <h2>{recipe.subName}</h2>
      <br></br>

      <div className='container-main'>
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
            <i className="material-icons">&#xe7ef;</i>
            <div>{recipe.like_cnt}</div>
          </div>

          <div className='container-icon'>
            <i className="material-icons">&#xea3c;</i>
            <div>{recipe.difficulty}</div>
          </div>

        </div>  
      </div>
      
      {/* Show recipe description from HTML format / Parsing data */}
      <div>
        <p>{ ReactHtmlParser(recipe.describtion) }</p>
      </div>

      {/* Show recipe description from HTML format / Parsing data */}
      <div>
        <button onClick={event => LikeMe()} >Like me</button>
      </div>

    </div>
  )
}

export default RecipeOverview
