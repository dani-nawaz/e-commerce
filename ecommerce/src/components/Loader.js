import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = ({ animation = 'grow' }) => {
  return (
    <div>
      <Spinner
        style={{
          width: '100px',
          height: '100px',
          display: 'block',
          margin: '10rem auto',
        }}
        animation={animation}
      />
    </div>
  )
}

export default Loader
