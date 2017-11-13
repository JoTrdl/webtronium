import React from 'react'

import Demo from './pages/Demo'

export default function DemoContainer (props) {
  return (
    <Demo {...props} />
  )
}

// Containers can be connected to the store
// and pass necessary props to the page impl.
// (pure components)
/* export default connect()(DemoContainer) */
