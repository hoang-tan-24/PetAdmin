import React, { useState, useRef, useEffect } from 'react';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import "./CalendarStyles.css";

const styles = {
    wrap: {
        display: "flex"
    },
    left: {
        marginRight: "10px"
    },
    main: {
        flexGrow: "1"
    }
};

const Calendar = () => {
    const calendarRef = useRef();
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        setStartDate(new Date());
        return () => {
        };
    }, []);

    const [calendarConfig] = useState({
        viewType: "Day",
        durationBarVisible: false,
        timeRangeSelectedHandling: "Enabled",
    });


    return (
        <div style={styles.wrap}>
            <div style={styles.left}>
                <DayPilotNavigator
                    selectMode={"Day"}
                    showMonths={1}
                    skipMonths={1}
                    startDate={startDate}
                />
            </div>
            <div style={styles.main}>
                <DayPilotCalendar
                    {...calendarConfig}
                    ref={calendarRef}
                />
            </div>
        </div>
    );
}

export default Calendar;
