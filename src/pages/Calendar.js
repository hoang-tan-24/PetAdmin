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
        onTimeRangeSelected: async args => {
            const dp = calendarRef.current.control;
            const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
            dp.clearSelection();
            if (!modal.result) { return; }
            dp.events.add({
                start: args.start,
                end: args.end,
                id: DayPilot.guid(),
                text: modal.result,
                backColor: getRandomColor()
            });
        },
        eventDeleteHandling: "Update",
        onEventClick: async args => {
            const dp = calendarRef.current.control;
            const modal = await DayPilot.Modal.prompt("Update event text:", args.e.text());
            if (!modal.result) { return; }
            const { e } = args.e;
            e.data.text = modal.result;
            dp.events.update(e);
        },
    });


    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i += 1) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <div style={styles.wrap}>
            <div style={styles.left}>
                <DayPilotNavigator
                    selectMode={"Day"}
                    showMonths={1}
                    skipMonths={1}
                    startDate={startDate}
                    onTimeRangeSelected={args => {
                        calendarRef.current.control.update({
                            startDate: args.day
                        });
                    }}
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
