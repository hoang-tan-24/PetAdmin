import axios from 'axios';
import { useEffect, useState } from 'react';

const useServiceListByShopId = (shopId) => {
  const [nameServices, setNameServices] = useState([]);

  useEffect(() => {
    const fetchNameServices = async () => {
      try {
        const response = await axios.get(`https://localhost:7196/api/Service?shopId=${shopId}`,{mode: 'cors'});
        const data = response.data;
        setNameServices(data);
      } catch (error) {
        console.error('Error fetching nameServices:', error);
        setNameServices([]);
      }
    };

    fetchNameServices();
  }, []);

  return nameServices;
};
export default useServiceListByShopId;