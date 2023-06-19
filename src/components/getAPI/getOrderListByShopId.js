import axios from 'axios';
import { useEffect, useState } from 'react';

const useOrderListByShopId = (shopId) => {
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`https://localhost:7196/api/Order/search?shopId=${shopId}`);
                const data = response.data;
                setOrderList(data);
            } catch (error) {
                console.error('Error fetching nameProducts:', error);
                setOrderList([]);
            }
        };

        fetch();
    }, []);

    return orderList;
};
export default useOrderListByShopId;