import axios from 'axios';

const shopLogin = async (email) => {
    try {
        const response = await axios.post(`https://localhost:7196/api/Employee/shopLogin?email=${email}`);
        const data = response.data;
        console.log(data);
        localStorage.setItem('employee', JSON.stringify(data));
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
//                 const response = await axios.post(`https://localhost:7196/api/Employee/shopLogin?email=${email}`);
//                 const data = response.data;
//                 setEmployee(data);
//                 console.log('Get success:', data)
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