import axios from 'axios';
import { useEffect, useState } from 'react';

const useOrderedSlot = (sid) => {
    const [os, setOs] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`https://localhost:7196/api/OrderSlot?shopId=${sid}`);
                const data = response.data;
                setOs(data);
                console.log('Get order slot success:', data)

            } catch (error) {
                console.error('Error fetching:', error);
                setOs([]);
            }
        };

        fetch();
    }, []);

    return os;
};
export default useOrderedSlot;