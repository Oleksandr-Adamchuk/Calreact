import React, {Component} from 'react'
import Appointment from './Appointment'

class AppointmentsList extends Component {
  render(){
    
    return(
      <div>
        { 
          this.props.appointments.map( appointment => {
          return (
              <Appointment appointment={appointment} key={appointment.id}/>
          );
          })
        }
      </div>
    )
  }
}

export default AppointmentsList