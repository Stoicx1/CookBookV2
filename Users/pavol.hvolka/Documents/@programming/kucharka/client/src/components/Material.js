import React from 'react'
import { Link } from 'react-router-dom'

const Material = (props) => {
  return (
    
    <div className='data-field'>
        {/* import icons google */}
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>

        {/* image */}
        <img src={props.img}></img>
        {/* name of recipe */}
        <div className='data-field-name'>{props.name}</div>
        {/* params of recipe */}
        <div id='container-icons'>
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
        {/* show overview of recipe */}
        <Link to={`/RecipeOverview/${props.id}`} >
          <div className='btn' onClick={() => {
            props.eventClick(props.id)
          }}>Show me detail</div>
        </Link>


    </div>
  )
}

export default Material