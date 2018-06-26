import React, {Component} from 'react'
import Datetime from 'react-datetime'
import Label from './Label'

class AppointmentForm extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onFormSubmit();
  }

  handleChange = (e) => {
    const name = e.target.name;
    const obj = {};
    obj[name] = e.target.value;
    this.props.onUserInput(obj);
  }
  setAppTime = (e) => {
    console.log(e);
    const name = 'app_time';
    const obj = {};
    if(obj[name] = e.toDate()){
      this.props.onUserInput(obj)
    }
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
            onChange={(e) => this.handleChange(e)}
            value={this.props.input_title}
          />
          <Datetime 
            input={true} 
            inputProps={inputProps}
            value={this.props.input_app_time}
            onChange={this.setAppTime}
          />
          <input type='submit' value='Make Appointment' className='submit-button'/>
        </form>
      </div>
    )
  }
}

export default AppointmentForm