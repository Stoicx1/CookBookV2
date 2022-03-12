
import React, {useState, useEffect} from 'react'
import ReactHtmlParser from 'react-html-parser'; 
import { useParams } from 'react-router-dom';

const RecipeOverview = () => {

  const [recipe, SetRecipe] = useState([])
  const { id } = useParams();

  useEffect(() => {
    fetch('http://localhost:5000/RecipeOverview/' + id)
      .then(res => res.json())
      .then(data => {
        SetRecipe(data)
      })
  }, [])

  useEffect(() => {
    console.log(recipe)
  }, [recipe])


  return (
    <div className='container-content overview' > 
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>

      <h2>{recipe.name}</h2>

      <div className='container-main'>
        {/* image */}
        <div className='container-img'>
          <img src={recipe.image} alt={recipe.name} ></img>
        </div>
        
        {/* params of recipe */}
        <div  className='container-icons'>
          <div className='container-icon'>
            <i className="material-icons">&#xe855;</i>
            <div>20min</div>
          </div>
          <div className='container-icon'>
            <i className="material-icons">&#xe7ef;</i>
            <div>2pcs</div>
          </div>
          <div className='container-icon'>
            <i className="material-icons">&#xea3c;</i>
            <div>Easy</div>
          </div>
        </div>  
      </div>
      
      <div>
        <p>{ ReactHtmlParser(recipe.describtion) }</p>
      </div>

    </div>
  )
}

export default RecipeOverview
