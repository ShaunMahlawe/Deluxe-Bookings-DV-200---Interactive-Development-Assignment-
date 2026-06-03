import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { subDays } from "date-fns"; 

import "react-datepicker/dist/react-datepicker.css";

function DatesPicker() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const excludeDates = [
    new Date(),               
    subDays(new Date(), 1)
  ];

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      excludeDates={excludeDates}
      placeholderText="Select a date other than today or yesterday"
    />
  );
}

export default DatesPicker;