import React, {Component} from 'react'
import Datetime from 'react-datetime'
import Label from './Label'
import moment from "moment"


class AppointmentForm extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onFormSubmit();
  }

  handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    this.props.onUserInput(fieldName, fieldValue);
  }
  setAppTime = (e) => {
    const fieldName = 'app_time';
    const fieldValue = e.toDate();
    this.props.onUserInput(fieldName, fieldValue);
  }
  render(){
    const inputProps = {
      name: 'app_time'
    };

    return(
      <div>
        <h2>Make an Appointment</h2>
        <Label label='Enter a date and time'/>
        <form onSubmit={this.handleSubmit}>
          <input 
            name='title' 
            placeholder='Appointment tiile' 
            onChange={this.handleChange}
            value={this.props.title.value}
          />
          <Datetime 
            input={false} 
            inputProps={inputProps}
            value={moment(this.props.app_time.value)}
            onChange={this.setAppTime}
          />
          <input 
            type='submit' 
            value='Make Appointment' 
            className='submit-button'
            disabled={!this.props.formValid}
          />
        </form>
      </div>
    )
  }
}

export default AppointmentForm