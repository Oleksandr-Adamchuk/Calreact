import React, { Component } from "react"
import ReactDOM from 'react-dom'
import Appointment from './Appointment'
import AppointmentForm from './AppointmentForm'
import AppointmentsList from './AppointmentsList'
import update from 'react-addons-update'
import { FormErrors } from './FormErrors'
import moment from 'moment'
import PropTypes from 'prop-types'

class Appointments extends Component {
  static propTypes = {
    appointments: PropTypes.array.isRequired
  }

  constructor(props, railsContext){
    super(props);
    console.log(props);
    this.state = {
      appointments: this.props.appointments,
      title: {value: '', valid:false},
      app_time: {value: '', valid:false},
      formErrors: '',
      formValid: false
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleUserInput = (fieldName, fieldValue) => {
    const newFieldState = update(this.state[fieldName], 
                          {value: {$set: fieldValue}});
    this.setState({[fieldName]:newFieldState}, 
                  () => this.validateField(fieldName, fieldValue)
    )
  }

  validateField = (fieldName, fieldValue) => {
    let fieldValid;
    let fieldErrors;
    switch(fieldName) {
      case 'title':
        fieldValid = this.state.title.value.trim().length > 2;
        if(!fieldValid){
          fieldErrors=' should be at least 3 characters long';
        }
        break;
      case 'app_time':
        fieldValid = moment(this.state.app_time.value).isValid() &&
                     moment(this.state.app_time.value).isAfter();
        if(!fieldValid) {
          fieldErrors=' should not be in the past';
        }
      default:
        break;
    }
    const newFieldState = update(this.state[fieldName], { valid: {$set: fieldValid} });
    const newFormErrors = update(this.state.formErrors, {$set: fieldErrors});
    this.setState({[fieldName]: newFieldState, 
                  formErrors: newFormErrors},
                  this.validateForm);
}

  validateForm = () => {
    this.setState({formValid: this.state.title.valid &&
                              this.state.app_time.valid})
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
          title={this.state.title} 
          app_time={this.state.app_time}
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