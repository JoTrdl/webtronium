import React from 'react'
import { connect } from 'react-redux'

function LoadingBar (props) {
  const { active, alt } = props
  const alternate = (alt && 'alt') || ''
  return (
    <div className={['loading-bar', alternate].join(' ')}>
      { active && <div className="loader" />}
    </div>
  )
}

export default connect(
  state => ({
    active: state.loading.active
  })
)(LoadingBar)
