import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Label extends Component {
  render(){
    return(
      <div>{this.props.label}</div>
    )
  }
}

Label.propTypes = {
  label: PropTypes.string
}