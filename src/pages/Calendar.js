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

import { Popover, Typography } from '@mui/material';
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

    const [orderedSlotId, setOrderedSlotId] = useState(1);
    const [orderedSlotStart, setOrderedSlotStart] = useState(null);
    const [orderedSlotEnd, setOrderedSlotEnd] = useState(null);

    const [orderStatus, setOrderStatus] = useState(0);
    const [serviceName, setServiceName] = useState('');
    const [serviceImage, setServiceImage] = useState('');
    const [servicePetTypeId, setServicePetTypeId] = useState(1);
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');


    const [openPopup, setOpenPopup] = useState(false);


    const [shopId, setShopId] = useState(2);
    const employee = JSON.parse(localStorage.getItem('employee'));
    if (employee && employee.shopId !== shopId) {
        console.log("employee co shop id la : ", employee.shopId)
        setShopId(employee.shopId)
    }
    const res = useOrderedSlot(shopId)
    console.log("order slot get from api", res)

    const handleClickCalendar = (id) => {
        setOrderedSlotId(id);
        const slotNo = res[id - 1];
        console.log(res);
        console.log(slotNo);
        console.log(events);
        setOpenPopup(true);
    };


    useEffect(() => {
        setStartDate(new Date());

        if (res) {
            const fetchedEvents = fetchEvents();
            setEvents(fetchedEvents);
            console.log("fetch success");
        }
        if (orderedSlotStart && res) {
            console.log("res ne : ", res)

            const matchingItem = res.find(item => item.startTime === orderedSlotStart);
            if (matchingItem) {
                setOrderStatus(matchingItem.status);
                setServiceName(matchingItem.service.name);
                setServiceImage(matchingItem.service.image);
                setServicePetTypeId(matchingItem.service.petTypeId);
                setUserEmail(matchingItem.user.email);
                setUserPhone(matchingItem.user.phone);
            }
        }
    }, [res, orderedSlotStart]);

    const [calendarConfig] = useState({
        viewType: "Day",
        durationBarVisible: true,
        timeRangeSelectedHandling: "Enabled",
        eventEditHandling: "Disabled", // Disable event editing
        eventResizeHandling: "Disabled", // Disable event resizing
        eventMoveHandling: "Disabled", // Disable event moving
        onEventClick: async args => {
            const dp = calendarRef.current.control;
            handleClickCalendar(args.e.id());
            setOrderedSlotStart(args.e.start().toString());
            setOrderedSlotEnd(args.e.end().toString());
            console.log(args.e)
        }
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

    const getRandomColor = () => {
        const brightness = 120; // Adjust this value to control the brightness (0-255)

        const randomChannel = () => {
            const value = Math.floor(Math.random() * (255 - brightness) + brightness);
            return value.toString(16).padStart(2, '0');
        };

        const color = `#${randomChannel()}${randomChannel()}${randomChannel()}`;
        return color;
    };

    function formatDate(date) {
        const formattedDate = new Date(date);
        const day = formattedDate.getDate();
        const month = formattedDate.getMonth() + 1; // Months are zero-based
        const year = formattedDate.getFullYear();
        const hours = formattedDate.getHours();
        const minutes = formattedDate.getMinutes();

        const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}`; // Add leading zero if minutes is a single digit

        return `${day}/${month}/${year} ${formattedTime}`;
    }


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
                // onClick={handleClickCalendar}
                />
            </div>
            <Popover
                open={openPopup}
                anchorEl={calendarRef.current}
                onClose={() => setOpenPopup(false)}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
            >
                <div>
                    <h2 style={{ paddingLeft: '30px' }}>Chi tiết đặt hàng:</h2>
                    <table style={{ padding: '30px' }}>
                        <tbody>
                            <tr style={{ paddingBottom: '10px' }}>
                                <td style={{ paddingRight: '30px' }}>Thời gian bắt đầu:</td>
                                <td>{formatDate(orderedSlotStart)}</td>
                            </tr>
                            <tr style={{ paddingBottom: '10px' }}>
                                <td style={{ paddingRight: '30px' }}>Thời gian kết thúc:</td>
                                <td>{formatDate(orderedSlotEnd)}</td>
                            </tr>

                            <tr style={{ paddingBottom: '10px' }}>
                                <td style={{ paddingRight: '30px' }}>Tên dịch vụ:</td>
                                <td>{serviceName}</td>
                            </tr>
                            <tr style={{ paddingBottom: '10px' }}>
                                <td style={{ paddingRight: '30px' }}>Trạng thái:</td>
                                <td>
                                    {orderStatus === 0 && 'Đã hủy'}
                                    {orderStatus === 1 && 'Chờ thanh toán'}
                                    {orderStatus === 2 && 'Chờ xác nhận'}
                                    {orderStatus === 3 && 'Đang chuẩn bị'}
                                    {orderStatus === 4 && 'Đang vận chuyển'}
                                    {orderStatus === 5 && 'Giao không thành công'}
                                    {orderStatus === 5 && 'Đã hoàn thành'}
                                </td>
                            </tr>
                            <tr style={{ paddingBottom: '10px' }}>
                                <td style={{ paddingRight: '30px' }}>Hình:</td>
                                <td>
                                    <img src={serviceImage} alt="Img" style={{ width: '200px', height: '200px' }} />
                                </td>
                            </tr>
                            <tr style={{ paddingBottom: '10px' }}>
                                <td style={{ paddingRight: '30px' }}>Loại thú cưng:</td>
                                <td>
                                    {servicePetTypeId === 1 && 'Chó'}
                                    {servicePetTypeId === 2 && 'Mèo'}
                                    {servicePetTypeId === 3 && 'Chim'}
                                    {servicePetTypeId === 4 && 'Cá'}
                                    {servicePetTypeId === 5 && 'Không phân loại'}
                                </td>
                            </tr>
                            <tr style={{ paddingBottom: '10px' }}>
                                <td style={{ paddingRight: '30px' }}>Email khách hàng:</td>
                                <td>{userEmail}</td>
                            </tr>
                            <tr style={{ paddingBottom: '10px' }}>
                                <td style={{ paddingRight: '30px' }}>Điện thoại khách hàng:</td>
                                <td>{userPhone}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </Popover >
        </div >
    );
}

export default Calendar;
