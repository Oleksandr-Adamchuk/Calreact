import React, { Component } from 'react';
import { formatDate } from './utils';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Appointment extends Component {
  constructor(props){
    super(props);

  }

  static propTypes = {
    appointment: PropTypes.object.isRequired
  }

  static defaultProps = {
    appointment: {}
  }

  render(){
    return(
      <div className='appointment'>
        <Link to={`/appointments/${this.props.appointment.id}`}>
          <h3>{this.props.appointment.title}</h3>
        </Link>
        <p>{formatDate(this.props.appointment.app_time)}</p>
      </div>
    )
  }
}

export default Appointment