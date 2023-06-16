import axios from 'axios';
import { useEffect, useState } from 'react';

const useShopListAdmin = (shopId) => {
    const [nameProducts, setNameProducts] = useState([]);

    useEffect(() => {
        const fetchNameProducts = async () => {
            try {
                const response = await axios.get(`https://localhost:7196/api/Shop`);
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
export default useShopListAdmin;