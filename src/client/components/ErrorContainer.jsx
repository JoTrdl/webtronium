import React from 'react'

import { NotFound, ServerError } from './pages/Errors'

export default function ErrorContainer (props) {
  let Page
  switch (props.status) {
    case 500:
      Page = ServerError
      break
    case 404:
    default:
      Page = NotFound
      break
  }

  return (
    <Page {...props} />
  )
}

// Containers can be connected to the store
// and pass necessary props to the page impl.
// (pure components)
/* export default connect()(ErrorContainer) */
