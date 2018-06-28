import React, { Component } from "react"
import ReactDOM from 'react-dom'
import Appointment from './Appointment'
import AppointmentForm from './Appointment_form'
import AppointmentsList from './AppointmentsList'
import update from 'react-addons-update'
import { FormErrors } from './FormErrors'


class Appointments extends Component {
  constructor(props, railsContext){
    super(props);
    this.state = {
      appointments: this.props.appointments,
      title: 'App title',
      app_time: 'Tomorrow ar 9pm',
      formErrors: '',
      formValid: true
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleUserInput = (obj) => {
    this.setState(obj, this.validateForm())
  }
  validateForm = () => {
    this.setState({formValid: this.state.title.trim().length > 3})
  }

  handleErrors = (response) => {
    if (!response.ok) {
      this.setState({formErrors:response.statusText});
      throw Error(response.statusText);
    }
    return response;
  }

  handleFormSubmit = () => {
    const meta_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const appointments = {title: this.state.title, app_time: this.state.app_time};
    const url = '/appointments';
    const formHeaders = {
      method: 'POST',
      headers: { 'X-CSRF-Token': meta_token, 
                 'Content-Type': 'application/json' },
      credentials: 'same-origin',  
      body: JSON.stringify({appointments: appointments})
    };
    const formRequest = new Request(url, formHeaders);

    fetch(formRequest)
      .then(response => this.handleErrors(response) )
      .then(response => response.json() )
      .then(data => {
        this.addNewAppointment(data);
        this.resetFormErrors();
      }).catch();
  }
  addNewAppointment = (appointment) => {
    const appointments = update(this.state.appointments, {$push: [appointment]  })

    this.setState({
      appointments:appointments.sort((a,b) => {
        return new Date(a.app_time) - new Date(b.app_time);
      })
    });
  }

  resetFormErrors = () => {
    this.setState({formErrors:''})
  }

  render(){
    return(
      <div>
        <FormErrors formErrors={this.state.formErrors}/>
        <AppointmentForm
          input_title={this.state.title} 
          input_app_time={this.state.app_time}
          onUserInput={this.handleUserInput}
          onFormSubmit={this.handleFormSubmit}
          formValid={this.state.formValid}
        />
        <AppointmentsList appointments={this.state.appointments}/>
      </div>
    );
  };
};  

export default Appointments;


// document.addEventListener('DOMContentLoaded', () => {
//   console.log('DOMContentLoaded');
//  const node = document.getElementById('appointments_data');
//  const data = JSON.parse(node.getAttribute('data'));

// ReactDOM.render(
//  <Appointments appointments={data} />,
//  document.body.appendChild(document.createElement('div'))
//  )
// })