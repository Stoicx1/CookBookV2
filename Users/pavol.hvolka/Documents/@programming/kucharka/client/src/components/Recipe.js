import React from 'react'
import { Link } from 'react-router-dom'

const Recipe = (props) => {

  return (
    <Link to={`/RecipeOverview/${props.id}`} >
      <div className='data-field' onClick={() => {
        props.eventClick(props.id)
      }}>
          {/* import icons google */}
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>

          {/* image */}
          <img src={props.img}></img>
          {/* name of recipe */}
          <div className='data-field-name'>{props.name}</div>
          <div className='data-field-subname'>{props.subname}</div>
          {/* params of recipe */}
          <div id='container-icons'>
            <div className='container-icon'>
              <i className="material-icons">&#xe855;</i>
              <div>{props.duration} min</div>
            </div>
            <div className='container-icon'>
              <i class="material-icons">&#xe8dc;</i>
              <div>{props.like_cnt}</div>
            </div>
            <div className='container-icon'>
              <i className="material-icons">&#xea3c;</i>
              <div>{props.difficulty}</div>
            </div>
          </div>
          {/* show overview of recipe */}
          {/* <Link to={`/RecipeOverview/${props.id}`} >
            <div className='btn' onClick={() => {
              props.eventClick(props.id)
            }}>Show me detail</div>
          </Link> */}
      </div>
    </Link>
  )
}

export default Recipe