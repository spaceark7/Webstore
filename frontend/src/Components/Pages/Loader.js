import React from 'react'
import { Spinner } from 'react-bootstrap'
const Loader = () => {
  return (
    <div className='row d-flex w-100 h-100vh flex-column align-items-center justify-content-center'>
      <Spinner role='status' animation='border'></Spinner>
    </div>
  )
}

export default Loader
