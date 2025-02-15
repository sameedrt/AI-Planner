//In this part I have firstly imported the react Calendar package so that we can get a basic calendar view. this is changeable though so even if it does not look good right now we can work on it.


import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 

const WeeklyCalendar = () => {
  const [date, setDate] = useState(new Date()); // this basically manages the date we currently select in the calendar

  const onChange = (newDate) => {  // on change is used to update the date when the user clicks on a new date.
    setDate(newDate);
  };

  return (
    <div>
      <h2>Weekly Calendar</h2>
      <Calendar
        onChange={onChange}
        value={date}
        view="week" // Show the week view because that is what we originally planned but in here we also have the option to display a monthly or yearly view
      />
    </div>
  );
};

export default WeeklyCalendar;
