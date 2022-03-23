import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../logo.png'

const Header = () => {
  return (
    <div id='header-container'>

      <div id='logo'>
        <img src={logo}></img>
      </div>

      <div id='title'>
        <h1>Drink Book</h1>
      </div>

        <nav>
          <NavLink className={'el-nav el-nav1'} to="/Main">Main</NavLink>
          <NavLink className={'el-nav el-nav2'} to="/AddRecipe">Add Recipe</NavLink>
        </nav>
      

    </div>
  )
}

export default Header