import React from 'react'

import Home from './pages/Home'

export default function HomeContainer () {
  return (
    <Home />
  )
}

// Containers can be connected to the store
// and pass necessary props to the page impl.
// (pure components)
/* export default connect()(HomeContainer) */
