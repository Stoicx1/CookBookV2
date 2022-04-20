import React, {useState, useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'

const AddRecipe = () => {

  // *********************************************************************************
    // * Variables
    // *********************************************************************************
    let urlGetFind = 'http://localhost:5000/find-material/'
    let urlGetAll = 'http://localhost:5000/get-recipe/'
    let urlDelID = 'http://localhost:5000/recipe/'

  // *********************************************************************************
  // * UseStates
  // *********************************************************************************
  const [name, setName] = useState('')
  const [subname, setSubname] = useState('')
  const [image, setImage] = useState('')
  const [duration, setDuration] = useState(0)
  const [difficulty, setDifficulty] = useState('')
  const [description, setDescription] = useState('');
  const [materials, setMaterials] = useState([])
  const [ingredient, setIngredient] = useState('')
  const [toFind, SetToFind] = useState('')

  const [materialShowList, setMaterialShowList] = useState([])

  // *********************************************************************************
  // * POST Request / post new recipe / On click submit button / event
  // *********************************************************************************
  const Submit = () => {
    // Post request options
    if (CheckFormValidity()) {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            name: name,
            subname: subname,
            image: image,
            duration: duration,
            like_cnt: 0,
            difficulty: difficulty,
            describtion: description,
            materials: materials
          })
      };
      // Fetch post request
      fetch('http://localhost:5000/save-recipe', requestOptions)
        .then(res => {
          //alert('saved to DB')
        })
      } else {
        // nothing
      }
  }  

  const CheckFormValidity = () => {
    if (name && subname && image && (duration>0) && (difficulty) && (description) && (materials.length>0) ) {
      return true
    } else {
      return false
    }
  }

  // *********************************************************************************
  // * Update of ingredient list
  // *********************************************************************************
  const UpdateMaterials = () => {
    fetch('http://localhost:5000/get-material')
      .then(res => res.json())
      .then(data => {
        setMaterialShowList(data)
      })
  }

  // *********************************************************************************
  // * AUTO Filter of ingredients
  // *********************************************************************************

  const AutoFind = () => {
    console.log(toFind)
    fetch(urlGetFind+toFind)
        .then(res => {
            if (res.ok) {
                return res.json()
            } 
            UpdateMaterials()
            throw new Error('Something went wrong')
        })
        .then(data => {
            console.log(data)
            setMaterialShowList(data)
        })
        .catch((err) => {
            console.log(err)
        })
  }

  useEffect(() => {
      AutoFind()
  }, [toFind])

  // *********************************************************************************
  // * POST Request / post new ingredient / On click submit button / event
  // *********************************************************************************
  const SubmitAddIngredient = (event) => {
    event.preventDefault()
    // Length of ingredient's name must be more than 3
    if (ingredient.length>2) {
      // Post request options
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: ingredient
        })
      };
      // Fetch post request
      fetch('http://localhost:5000/save-material', requestOptions)
        .then(res => {
          UpdateMaterials()
          setIngredient('')
        })
    }

  }

  // *********************************************************************************
  // * Updating material values
  // *********************************************************************************
  const AddIngredientToRecipe = (id, name, amount) => {
    setMaterials([...materials, { ingredient: id, matName: name, matAmount: 0, matType: 'pcs' }])
  }
  const UpdateMaterialsAmount = (index) => event => {
    let newArr = [...materials]
    newArr[index].matAmount = Number(event.target.value)
    setMaterials(newArr)
    console.log(materials)
  }
  const UpdateMaterialsType = (index) => event => {
    let newArr = [...materials]
    newArr[index].matType = event.target.value
    setMaterials(newArr)
    console.log(materials)
  }
  const DeleteRecipeMaterial = (index) => event => {
    let newArr = [...materials]
    newArr.splice(0, 1)
    setMaterials(newArr)
  }

  // *********************************************************************************
  // * Delete material from mongoDB
  // *********************************************************************************
  const DeleteRecipeMaterialDB = (id) => event => {
    // Post request options
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };
    // Fetch delete request with id param
    fetch('http://localhost:5000/material/'+id, requestOptions)
      .then(data => {
        UpdateMaterials()
      })
  }

  // Update after refresh
  useEffect( () => {
    UpdateMaterials()
  }, [])
  // Update after change of material list
  useEffect(() => {
    ;
  }, materialShowList)

  // *********************************************************************************
  // * Render page / AddRecipe
  // *********************************************************************************
  return (
    <div className='container-content container-content-add-form'>
      {/* import icons google */}
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>

        
        <form id='form' className='add-form'>
          <div id='contact' className='container-add-form'>
            
            <h1>New recipe form</h1>

            <fieldset>
              <button name="submit" type="submit" id="contact-submit" data-submit="...Sending" onClick={Submit}>Submit</button>
            </fieldset>

            <fieldset>
              <input placeholder="Name of recipe" name='name' type="text" tabIndex="1"  required onChange={event => setName(event.target.value)}/>
            </fieldset>
            <fieldset>
              <input placeholder="Subname of recipe" type="text" tabIndex="2" required onChange={event => setSubname(event.target.value)}/>
            </fieldset>
            <fieldset>
              <input placeholder="Image link" name='image' type="text" tabIndex="3"     required onChange={event => setImage(event.target.value)}/>
            </fieldset>
            <fieldset>
              <input placeholder="Duration" type="number" tabIndex="4" required onChange={event => setDuration(event.target.value)}/>
              <input type="radio" name='difficulty' value='easy' id='easy' tabIndex="5" onClick={event => setDifficulty(event.target.value)} />
              <label  htmlFor="easy">Easy</label>
              <input type="radio" name='difficulty' value='medium' id='medium' tabIndex="5" onClick={event => setDifficulty(event.target.value)} />
              <label htmlFor="medium">Medium</label>
              <input type="radio" name='difficulty' value='hard' id='hard' tabIndex="5" onClick={event => setDifficulty(event.target.value)} />
              <label htmlFor="hard">Hard</label>
            </fieldset>

            {/* Tiny field for description of recipe */}
            <div>
              <Editor
                apiKey='mv78nvk6wssh4zua73jgecfypmvns9zkb1y6gfz1hmbwa63v'
                initialValue="<p>This is initial description of recipe</p>"
                onEditorChange={(newValue, editor) => {
                  setDescription(newValue);
                }}
                init={{
                  height: 250,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                  ],
                  toolbar: 'undo redo | formatselect | ' +
                  'bold italic backcolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
              />
            </div>

            {/* Ingredients list */}
            <div id='container-field-ingredient'>
              {
                materials.map((material, index) => {
                  return (
                    <div key={material.matName+index}  className='field'>
                      <div     key={'name'+index}   className='ingredient-name'   htmlFor="hard">{material.matName}</div>
                      <input   key={'amount'+index} className='ingredient-amount' placeholder='amount' type="number" name='amount' onChange={UpdateMaterialsAmount(index)}/>
                      <select  key={'opt'+index} className="ingredient-type" name="cars" defaultValue={'pcs'} onChange={UpdateMaterialsType(index)} >
                        <option value="ml" >ml</option>
                        <option value="dl" >dl</option>
                        <option value="l"  >l</option>
                        <option value="g"  >g</option>
                        <option value="dg" >dg</option>
                        <option value="kg" >kg</option>
                        <option value="PL" >PL</option>
                        <option value="CL" >CL</option>
                        <option value="pcs">pcs</option>
                        <option value="~">~</option>
                      </select>
                      <i key={'icon'+index} className="material-icons" onClick={DeleteRecipeMaterial(index)} >delete</i>
                    </div>
                  )
                })
              }
            </div>

          </div>
        </form>
        
        <form className='form-add-ingredient'>
          <input type="text" placeholder='add ingredient'  onChange={event => setIngredient(event.target.value)} ></input>
          <input className='form-add-ingredient-submit' type="submit" value="submit"  onClick={event => SubmitAddIngredient(event)} ></input>
        </form> 

        <form className='form-add-ingredient'>
          <input type="text" placeholder='filter'  onChange={event => SetToFind(event.target.value)} ></input>
          <input className='form-add-ingredient-submit' type="submit" value="submit"  onChange={event => SetToFind(event.target.value)} ></input>
        </form> 

        <div id='container-material-input'>
          {
            materialShowList.map((material, index) => {
              return (
                <div id='material-input'>
                  <div value={material._id} name={material.name}  key={index} 
                    onClick={() => AddIngredientToRecipe(material._id, material.name, material.amount)}>{material.name}
                  </div>
                  <i key={'icon'+index} className="material-icons icon-delete-material" onClick={DeleteRecipeMaterialDB(material._id)} >delete</i>
                </div>
                
              )
            })
          }  
        </div>
    </div>
  )
}

export default AddRecipe