import axios from 'axios';
import { useEffect, useState } from 'react';

const useUserListAdmin = (shopId) => {
    const [nameProducts, setNameProducts] = useState([]);

    useEffect(() => {
        const fetchNameProducts = async () => {
            try {
                const response = await axios.get(`https://petuni-api.azurewebsites.net/api/User`);
                const data = response.data;
                setNameProducts(data);
            } catch (error) {
                console.error('Error fetching nameProducts:', error);
                setNameProducts([]);
            }
        };

        fetchNameProducts();
    }, []);

    return nameProducts;
};
export default useUserListAdmin;