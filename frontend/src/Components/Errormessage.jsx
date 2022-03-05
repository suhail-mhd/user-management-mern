import React from 'react'
import {Alert} from 'react-bootstrap'

function Errormessage({variant = 'danger' , children}) {
  return (
  
    <Alert variant={variant} style={{fontSize:15 , color:"red"}} >
        <strong>{children}</strong>
    </Alert>
  )
}

export default Errormessage