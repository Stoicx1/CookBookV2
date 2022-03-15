
import React, {useState, useEffect} from 'react'
import Recipe from '../components/Recipe'
import PaginationComponent from '../components/PaginationComponent'

const Main = () => {

    // *********************************************************************************
    // * Variables
    // *********************************************************************************
    let urlGetFind = 'http://localhost:5000/find-recipe/'
    let urlGetAll = 'http://localhost:5000/get-recipe/'
    let urlDelID = 'http://localhost:5000/recipe/'

    // *********************************************************************************
    // * UseStates
    // *********************************************************************************
    const [materials, SetMaterials] = useState([])
    const [toFind, SetToFind] = useState('')
    const [pages, setPages] = useState([])
    const [actPage, setActPage] = useState(0)
    
    // *********************************************************************************
    // * GET Request / Filter data / List filtered recipes
    // *********************************************************************************
    const Submit = async event => {
        event.preventDefault();
        fetch(urlGetFind+toFind)
            .then(res => {
                if (res.ok) {
                    return res.json()
                } 
                GetAllData()
                throw new Error('Something went wrong')
            })
            .then(data => {
                console.log(data)
                SetMaterials(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // *********************************************************************************
    // * GET Request / Get all data / Full list of recipes from MongoDB
    // *********************************************************************************
    const GetAllData = event => {
        fetch(urlGetAll)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                SetMaterials(data)
            })
    }
    
    // *********************************************************************************
    // * DELETE Request
    // *********************************************************************************
    const RemoveDataID = (id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(urlDelID+id, requestOptions)
            .then(res => {
                res.json()
                GetAllData()
            })
            .catch(err => console.log(err))
    }

    // *********************************************************************************
    // * Init call / Get all recipes 
    // *********************************************************************************
    useEffect(() => {
        GetAllData()
        setActPage(1)
    }, [])

    // *********************************************************************************
    // * Logic of the pagination
    // *********************************************************************************
    useEffect(() => {
        let arr = []
        let pages = Math.ceil(materials.length/6)
        for(let i = 0; i<pages; i++) {
            arr.push([])
        }
        setPages(arr)
    }, [materials])

    const Pagination = (page) => {
        setActPage(page)
    }

    useEffect(() => {
        setActPage(1)
    }, [toFind])

    // *********************************************************************************
    // * Render page / Main / List of recipes 
    // *********************************************************************************
    return (
        <div id='container-content'>

            {/* Form for filtering data */}
            <div className='finding-form'>
                <form  onSubmit={Submit}>
                    <div>
                        <input className='input-find' type="text" name="name" onChange={event => SetToFind(event.target.value)} />
                    </div>
                    <div>
                        <input type="submit" name="submit" />
                    </div>    
                        
                </form>
            </div>

            {/* Msg if no data */}
            {
                (materials.length===0) && <div><p>Nepodarilo sa najst ziadny recept</p></div>
            }

            {/* Render data of recipes */}
            <div id='content-wrapper'>
                {
                    materials.map((recipe, index) => {
                        if ( index>=(actPage*6-6) && index<(actPage*6) ){
                            return(
                                <Recipe key={index} name={recipe.name} cisloVPoradi={index} id={recipe._id} img={recipe.image} />
                            )
                        }
                    })
                }
            </div>
            
            {/* Pagination */}
            <div className='demo'>
                <div className='demo1'>
                    {   
                        pages.map((element, index) => {
                            return (
                                <PaginationComponent eventClick={Pagination} key={index} name={index+1} />
                            )
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default Main