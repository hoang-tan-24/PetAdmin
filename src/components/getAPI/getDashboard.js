import axios from 'axios';
import { useEffect, useState } from 'react';

const useDashboard = (sid) => {
    const [dashboard, setDashboard] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                if (sid === -1) {
                    const response = await axios.get(`https://petuni-api.azurewebsites.net/api/Dashboard?shopId=-1`);
                    const data = response.data;
                    setDashboard(data);
                    console.log('Get dashboard success:', data)
                } else {
                    // const employee = JSON.parse(localStorage.getItem('employee'));
                    // console.log("employee neeeeeeeeee", employee)
                    // const response = await axios.get(`https://localhost:7196/api/Dashboard?shopId=${employee.shopId}`);
                    const response = await axios.get(`https://petuni-api.azurewebsites.net/api/Dashboard?shopId=${sid}`);
                    const data = response.data;
                    setDashboard(data);
                    console.log('Get dashboard success:', data)
                }

            } catch (error) {
                console.error('Error fetching:', error);
                setDashboard([]);
            }
        };

        fetch();
    }, []);

    return dashboard;
};
export default useDashboard;