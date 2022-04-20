import React from 'react'
import { Link } from 'react-router-dom'

const FavRecipeComponent = (props) => {
  return (
    <Link to={`/RecipeOverview/${props.id}`} >
      <div className='container-top10-element'>
        <img src={props.image}></img>
        <div className='container-top10-description'>
          <div className='top10-description'>{props.name}</div>
          <span class="material-icons like">&#xe87e;</span>
          <div className='top10-description like-cnt'>{props.like_cnt}</div> 
        </div>
      </div>
    </Link>
    
  )
}

export default FavRecipeComponent