import axios from 'axios';

const shopLogin = async (email) => {
    try {
        const response = await axios.post(`https://petuni-api.azurewebsites.net/api/Employee/shopLogin?email=${email}`);

        if (response.status !== 200) {
            return false;
        }

        const data = response.data;
        console.log("shop login api called success", data);
        localStorage.setItem('employee', JSON.stringify(data));
        const employee = JSON.parse(localStorage.getItem('employee'));
        console.log("employee in shop login", employee)
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { shopLogin };


// import axios from 'axios';
// import { useEffect, useState } from 'react';

// const useShopLogin = (email) => {
//     const [employee, setEmployee] = useState([]);

//     useEffect(() => {
//         const fetch = async () => {
//             try {
//                 console.log("employee in shop login", email)
//                 const response = await axios.post(`https://localhost:7196/api/Employee/shopLogin?email=${email}`);
//                 const data = response.data;
//                 localStorage.setItem('employee', JSON.stringify(data));
//                 setEmployee(data)
//                 console.log("employee in shop login", employee)
//             } catch (error) {
//                 console.error('Error fetching:', error);
//                 setEmployee([]);
//             }
//         };

//         fetch();
//     }, []);

//     return employee;
// };
// export default useShopLogin;