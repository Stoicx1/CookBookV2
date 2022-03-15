import React, {useState} from 'react'
import {Editor} from '@tinymce/tinymce-react'

const AddRecipe = () => {

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

  // *********************************************************************************
  // * POST Request / post new recipe / On click submit button / event
  // *********************************************************************************
  const Submit = async () => {
    // Post request options
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: name,
          subname: subname,
          image: image,
          duration: duration,
          difficulty: difficulty,
          describtion: description,
          materials: materials
        })
    };
    // Fetch post request
    const response = await fetch('http://localhost:5000/save-recipe', requestOptions)
    const data = await response.json()
  }  

  // *********************************************************************************
  // * Render page / AddRecipe
  // *********************************************************************************
  return (
    <div className='container-content container-content-add-form'>
        
        <form id='form' className='add-form'>
          <div id='contact' className='container-add-form'>
            
            <h1>New recipe form</h1>

            <fieldset>
              <button name="submit" type="submit" id="contact-submit" data-submit="...Sending" onClick={Submit}>Submit</button>
            </fieldset>

            <fieldset>
              <input placeholder="Name of recipe" name='name' type="text" tabindex="1"  required onChange={event => setName(event.target.value)}/>
            </fieldset>
            <fieldset>
              <input placeholder="Subname of recipe" type="text" tabindex="2" required/>
            </fieldset>
            <fieldset>
              <input placeholder="Image link" name='image' type="text" tabindex="3"     required onChange={event => setImage(event.target.value)}/>
            </fieldset>
            <fieldset>
              <input placeholder="Duration" type="number" tabindex="4" required/>
              <input type="radio" name='difficulty' value='easy' id='easy' tabindex="5" />
              <label for="easy">Easy</label>
              <input type="radio" name='difficulty' value='medium' id='medium' tabindex="5" />
              <label for="medium">Medium</label>
              <input type="radio" name='difficulty' value='hard' id='hard' tabindex="5" />
              <label for="hard">Hard</label>
            </fieldset>
            

            {/* input for title of recipe
            <div>
              Name:
              <input type="text" name="name" onChange={event => setName(event.target.value)}  />
            </div>

            <div>
              Image:
              <input type="text" name="image" onChange={event => setImage(event.target.value)}  />
            </div> */}

            {/* Tiny field for description of recipe */}
            <div>
              <Editor
                apiKey='mv78nvk6wssh4zua73jgecfypmvns9zkb1y6gfz1hmbwa63v'
                initialValue="<p>This is initial description of recipe</p>"
                onEditorChange={(newValue, editor) => {
                  setDescription(newValue);
                }}
                init={{
                  height: 300,
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

            {/* Submit button for confirm to add recipe */}
            {/* <input type="submit" value="Submit" onClick={Submit} /> */}
          </div>
        </form>
    </div>
  )
}

export default AddRecipe