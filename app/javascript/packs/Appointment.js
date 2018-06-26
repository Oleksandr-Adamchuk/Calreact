import React, { Component } from 'react';
import { formatDate } from './utils';

const Appointment = ({appointment}) =>   {
    return(
      <div key={appointment.id} className='appointment'>
        <h3>{appointment.title}</h3>
        <p>{formatDate(appointment.app_time)}</p>
      </div>
    )
  
}
export default Appointment