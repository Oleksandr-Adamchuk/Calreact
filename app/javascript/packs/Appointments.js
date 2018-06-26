import React, { Component } from "react"
import ReactDOM from 'react-dom'
import Appointment from './Appointment'
import AppointmentForm from './Appointment_form'
import AppointmentsList from './AppointmentsList'
import update from 'react-addons-update'


class Appointments extends Component {
  constructor(props){
    super(props);
    this.state = {
      appointments: this.props.appointments,
      title: 'App title',
      app_time: 'Tomorrow ar 9pm' 
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleUserInput = (obj) => {
    this.setState(obj)
  }
  handleFormSubmit = () => {
    const meta_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    console.log (meta_token);
    const appointments = {title: this.state.title, app_time: this.state.app_time};
    // const token = this.props.csrf_token;
    const url = '/appointments';
    fetch(url, {
      method: 'POST',
      headers: { 'X-CSRF-Token': meta_token, 
                 'Content-Type': 'application/json' },
      credentials: 'same-origin',  
      body: JSON.stringify({appointments: appointments})
    }).then((response) => {
      return response.json();
    }).then((data) => (
      this.addNewAppointment(data)
    ));
  }
  addNewAppointment = (appointment) => {
    const appointments = update(this.state.appointments, {$push: [appointment]  })
    this.setState({
      appointments:appointments.sort((a,b) => {
        return new Date(a.app_time) - new Date(b.app_time);
      })
    });
  }
  render(){
    return(
      <div>
        <AppointmentForm 
          input_title={this.state.title} 
          input_app_time={this.state.app_time}
          onUserInput={this.handleUserInput}
          onFormSubmit={this.handleFormSubmit}
        />
        <AppointmentsList appointments={this.state.appointments}/>
      </div>
    );
  };
};  

export default Appointments;


document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded');
 const node = document.getElementById('appointments_data');
 const data = JSON.parse(node.getAttribute('data'));

ReactDOM.render(
 <Appointments appointments={data} />,
 document.body.appendChild(document.createElement('div'))
 )
})