import React from 'react'

import Docs from './pages/Docs'

export default function DocsContainer (props) {
  return (
    <Docs {...props} />
  )
}

// Containers can be connected to the store
// and pass necessary props to the page impl.
// (pure components)
/* export default connect()(DocsContainer) */
