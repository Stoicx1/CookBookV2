import React, {useState, useEffect} from 'react'
import { Link, NavLink } from 'react-router-dom'

const Ingredients = (props) => {

  const [numDrinks, setNumDrinks] = useState(Number)
  const loaded = Object.keys(props.recept).length > 0

  useEffect(() => {

  }, [numDrinks])

  useEffect(() => {
    setNumDrinks(1)
  }, [])

  return (
    <div className='container-ingredient'>
        <div className='wrapper-count-ingredient'>
          <div className='container-count-ingredient'>
            <p>Počet nápojov: </p>
            <input placeholder="Počet nápojov" type="number" defaultValue={1} onChange={event => setNumDrinks(event.target.value)}/>
          </div>
         </div>
        <table>
          { loaded
              ?
                props.recept.materials.map((ingredient) => {
                  return(
                        <tr>
                          <th className='th1'>{ingredient.matName}</th>
                          <th className='th2'>{ingredient.matAmount*numDrinks}</th>
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