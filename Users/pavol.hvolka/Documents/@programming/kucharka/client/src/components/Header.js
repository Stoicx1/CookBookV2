import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <div id='main-title'>
        <h1>COOK BOOK</h1>
      </div>

      <nav>
        <NavLink className={'el-nav'} to="/Main">Main</NavLink>
        <NavLink className={'el-nav'} to="/AddRecipe">Add Recipe</NavLink>
        <Link className={'el-nav'} to="/RecipeOverview">Show Recipe</Link>
      </nav>
    </div>
  )
}

export default Header