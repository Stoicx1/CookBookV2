import React from 'react'

const PaginationComponent = (props) => {
  return (
    <a className='btn-pagination' onClick={() => {
      props.eventClick(props.name)
    }} >{props.name}</a>
  )
}

export default PaginationComponent