import axios from 'axios';
import { useEffect, useState } from 'react';

const useServiceListAdmin = (shopId) => {
    const [nameProducts, setNameProducts] = useState([]);

    useEffect(() => {
        const fetchNameProducts = async () => {
            try {
                const response = await axios.get(`https://localhost:7196/api/Service`);
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
export default useServiceListAdmin;