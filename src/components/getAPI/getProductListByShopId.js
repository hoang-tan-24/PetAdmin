// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UseProductsByShopId = (shopId) => {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const response = await axios.get(`https://localhost:7196/api/Product?shopId=${shopId}`);
//           setProducts(response.data);
//         } catch (error) {
//           console.error(error);
//         }
//       };

//       fetchData();
//     }, [shopId]);

//     return products;
//   };
//   export { UseProductsByShopId };

import axios from 'axios';
import { useEffect, useState } from 'react';

const useProductListByShopId = (shopId) => {
  const [nameProducts, setNameProducts] = useState([]);

  useEffect(() => {
    const fetchNameProducts = async () => {
      try {
        const response = await axios.get(`https://localhost:7196/api/Product?ShopId=${shopId}`);
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
export default useProductListByShopId;