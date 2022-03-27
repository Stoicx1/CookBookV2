import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Ingredients = (props) => {

  const loaded = Object.keys(props.recept).length > 0

  return (
    <div className='container-ingredient'>
        <table>
          { loaded
              ?
                props.recept.materials.map((ingredient) => {
                  return(
                        <tr>
                          <th className='th1'>{ingredient.matName}</th>
                          <th className='th2'>{ingredient.matAmount}</th>
                          <th className='th3'>{ingredient.matType}</th>
                        </tr>
                        )
                })
              :
                <div>Loading data</div>
          } 
        </table>
      </div>
  )
}

export default Ingredients