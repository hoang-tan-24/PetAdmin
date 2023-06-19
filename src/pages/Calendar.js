// import React, { useState, useRef, useEffect } from 'react';
// import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
// import "./CalendarStyles.css";

// const styles = {
//     wrap: {
//         display: "flex"
//     },
//     left: {
//         marginRight: "10px"
//     },
//     main: {
//         flexGrow: "1"
//     }
// };

// const Calendar = () => {
//     const calendarRef = useRef();
//     const [startDate, setStartDate] = useState(new Date());

//     useEffect(() => {
//         setStartDate(new Date());
//         return () => {
//         };
//     }, []);

//     const [calendarConfig] = useState({
//         viewType: "Day",
//         durationBarVisible: false,
//         timeRangeSelectedHandling: "Enabled",
//         onTimeRangeSelected: async args => {
//             const dp = calendarRef.current.control;
//             const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
//             dp.clearSelection();
//             if (!modal.result) { return; }
//             dp.events.add({
//                 start: args.start,
//                 end: args.end,
//                 id: DayPilot.guid(),
//                 text: modal.result,
//                 backColor: getRandomColor()
//             });
//         },
//         eventDeleteHandling: "Update",
//         onEventClick: async args => {
//             const dp = calendarRef.current.control;
//             const modal = await DayPilot.Modal.prompt("Update event text:", args.e.text());
//             if (!modal.result) { return; }
//             const { e } = args.e;
//             e.data.text = modal.result;
//             dp.events.update(e);
//         },
//     });

//     const getRandomColor = () => {
//         const letters = "0123456789ABCDEF";
//         let color = "#";
//         for (let i = 0; i < 6; i += 1) {
//             color += letters[Math.floor(Math.random() * 16)];
//         }
//         return color;
//     };



//     return (
//         <div style={styles.wrap}>
//             <div style={styles.left}>
//                 <DayPilotNavigator
//                     selectMode={"Day"}
//                     showMonths={1}
//                     skipMonths={1}
//                     startDate={startDate}
//                     onTimeRangeSelected={args => {
//                         calendarRef.current.control.update({
//                             startDate: args.day
//                         });
//                     }}
//                 />
//             </div>
//             <div style={styles.main}>
//                 <DayPilotCalendar
//                     {...calendarConfig}
//                     ref={calendarRef}
//                 />
//             </div>
//         </div>
//     );
// }



// export default Calendar;



import React, { useState, useRef, useEffect } from 'react';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import "./CalendarStyles.css";
import useOrderedSlot from '../components/getAPI/getOrderedSlotByShopId';

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
    const [events, setEvents] = useState([]);

    const [shopId, setShopId] = useState(2);
    const employee = JSON.parse(localStorage.getItem('employee'));
    if (employee && employee.shopId !== shopId) {
        console.log("employee co shop id la : ", employee.shopId)
        setShopId(employee.shopId)
    }
    const res = useOrderedSlot(shopId)
    console.log("order slot get from api", res)


    useEffect(() => {
        setStartDate(new Date());

        if (res) {
            const fetchedEvents = fetchEvents();
            setEvents(fetchedEvents);
        }

    }, [res]);

    const [calendarConfig] = useState({
        viewType: "Day",
        durationBarVisible: true,
        timeRangeSelectedHandling: "Enabled",
        eventEditHandling: "Disabled", // Disable event editing
        eventResizeHandling: "Disabled", // Disable event resizing
        eventMoveHandling: "Disabled", // Disable event moving
    });

    // const fetchEvents = () => {
    // const fetchedEvents = [
    //     { id: 1, text: "kietpttse161220@fpt.edu.vn", start: "2023-06-01T09:00:00", end: "2023-06-01T09:30:00" },
    //     { id: 2, text: "tanhiho@gmail.com", start: "2023-06-01T09:00:00", end: "2023-06-01T10:30:00" },
    //     { id: 3, text: "toanthuyngoc@yahoo.com", start: "2023-06-01T09:00:00", end: "2023-06-01T10:30:00" },
    //     { id: 4, text: "skkaf@gmail.com", start: "2023-06-01T09:00:00", end: "2023-06-01T10:00:00" },
    //     { id: 5, text: "afgfkf@gmail.com", start: "2023-06-01T09:00:00", end: "2023-06-01T10:00:00" },
    //     // Add more events as needed
    // ];
    // const eventsWithColors = fetchedEvents.map(event => ({
    //     ...event,
    //     backColor: getRandomColor()
    // }));
    // return eventsWithColors;
    // };
    const fetchEvents = () => {
        // Replace this with your actual logic to fetch events data
        // from an API or any other source

        const fetchedEvents = res.map((event, index) => ({
            id: index + 1,
            text: event.user.email,
            start: event.startTime,
            end: event.endTime,
            backColor: getRandomColor()
        }));

        const eventsWithColors = fetchedEvents.map(event => ({
            ...event,
            backColor: getRandomColor()
        }));
        console.log("event with color", eventsWithColors)
        return eventsWithColors;
    };
    // const getRandomColor = () => {
    //     const letters = "0123456789ABCDEF";
    //     let color = "#";
    //     for (let i = 0; i < 6; i += 1) {
    //         color += letters[Math.floor(Math.random() * 16)];
    //     }
    //     return color;
    // };

    const getRandomColor = () => {
        const brightness = 120; // Adjust this value to control the brightness (0-255)

        const randomChannel = () => {
            const value = Math.floor(Math.random() * (255 - brightness) + brightness);
            return value.toString(16).padStart(2, '0');
        };

        const color = `#${randomChannel()}${randomChannel()}${randomChannel()}`;
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
                    events={events} // Pass the events data to the events prop
                />
            </div>
        </div>
    );
}

export default Calendar;
