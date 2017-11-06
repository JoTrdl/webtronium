import React from 'react'

export default function ServerError (props) {
  const { title, stack } = props
  return (
    <section className="container mg-top-2">
      <h1>Server Error: {title}</h1>
      <pre>{stack}</pre>
    </section>
  )
}
