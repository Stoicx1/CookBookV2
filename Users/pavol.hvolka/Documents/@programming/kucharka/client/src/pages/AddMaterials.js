import React, {useState, useEffect, useRef} from 'react'
import {Editor} from '@tinymce/tinymce-react'

const AddMaterials = () => {

  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [descValue, setDescValue] = useState('<p>The quick brown fox jumps over the lazy dog</p>');
  const [descText, setDescText] = useState('');

  useEffect(() => {
    console.log(descValue)
    console.log(descText)
}, [descValue])

  const fetchData = async () => {
    // Request template
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: title,
          image: image,
          describtion: descValue
        })
    };
    // Fetch request
    const response = await fetch('http://localhost:5000/save-material', requestOptions)
    const data = await response.json()
  }  

  return (
    <div className='container-content'>
        <h1>AddMaterials</h1>
        <form id='form'>
          <div id='container-form'>
            <div>
              Name:
              <input type="text" name="name" onChange={event => setTitle(event.target.value)}  />
            </div>
            <div>
              Image:
              <input type="text" name="image" onChange={event => setImage(event.target.value)}  />
            </div>
            <div>
              <Editor apiKey='mv78nvk6wssh4zua73jgecfypmvns9zkb1y6gfz1hmbwa63v'
                initialValue="<p>This is initial description of recipe</p>"
                onEditorChange={(newValue, editor) => {
                  setDescValue(newValue);
                  setDescText(editor.getContent({format: 'text'}));
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
            <input type="submit" value="Submit" onClick={fetchData} />
          </div>
        </form>
    </div>
  )
}

export default AddMaterials