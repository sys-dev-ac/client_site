import React from 'react';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from "dayjs/plugin/timezone.js";

const DateJsComponent = () => {

   dayjs().subtract(1, 'day');
    dayjs.extend(utc);
    dayjs.extend(timezone);

    const istSlots = [
        "2025-10-15T09:00:00+05:30",
        "2025-10-15T10:00:00+05:30",
        "2025-10-15T11:00:00+05:30",
        "2025-10-15T12:00:00+05:30",
        "2025-10-15T13:00:00+05:30",
        "2025-10-15T14:00:00+05:30",
        "2025-10-15T15:00:00+05:30",
        "2025-10-15T16:00:00+05:30",
        "2025-10-15T17:00:00+05:30",
        "2025-10-15T18:00:00+05:30"
    ];

    const selectedTz = "America/New_York";
   // console.log(dayjs().subtract(2, 'day'));

    console.log("the timezones list " ,timezone)

    const convertedSlots = istSlots.map(slot =>
        dayjs(slot).tz(selectedTz).format("YYYY-MM-DD hh:mm A")
    )

    console.log("Converted Slots: ", convertedSlots);
   console.log(dayjs('2018-08-08'));

    return (
        <>
    <p>Hello world</p>
</>
    );
}


export default DateJsComponent;