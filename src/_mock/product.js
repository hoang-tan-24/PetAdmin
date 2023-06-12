// const randomProductName = () => {
//     const productNames = [
//         "Patê cho thú cưng",
//         "Súp thưởng chó mèo",
//         "Thức ăn hạt chó mèo",
//         "Lồng vận chuyển thú cưng",
//         "Thuốc xổ giun cho chó mèo",
//         "Đồ chơi cho thú cưng",
//         "Thuốc trị nấm cho thú cưng",
//         "Khăn tắm cho thú cưng",
//         "Lược chải lông cho thú cưng",
//         "Bóng đồ chơi cho thú cưng"
//     ];
//     const randomIndex = Math.floor(Math.random() * productNames.length);
//     return productNames[randomIndex];
// };

// const randomClassifyProducts = () => {
//     const classifyProducts = [
//         "Đồ chơi",
//         "Thức ăn",
//         "Dụng cụ",
//     ];

//     const randomIndexx = Math.floor(Math.random() * classifyProducts.length);
//     return classifyProducts[randomIndexx];
// }

// const randomPetTypeProducts = () => {
//     const PetTypeProducts = [
//         "Chó",
//         "Mèo",
//         "Chim",
//         "Cá",
//         "Thú cưng"
//     ];

//     const randomIndexxx = Math.floor(Math.random() * PetTypeProducts.length);
//     return PetTypeProducts[randomIndexxx];
// }


// const nameProducts = [...Array(24)].map((_, index) => ({
//     id: index + 1,
//     avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
//     nameProducts: randomProductName(),
//     quantity: Math.floor(Math.random() * 100) + 1,
//     classify: randomClassifyProducts(),
//     price: `${Math.floor(Math.random() * 10000000)} VNĐ`,
//     petType: randomPetTypeProducts(),
//     status: Math.random() < 0.5 ? 'Đang ẩn' : 'Đang bán',
// }));

// export default nameProducts;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { UseProductsByShopId } from '../components/gettest';


// const NameProducts = () => {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://localhost:7196/api/Product?ShopId=1');
//         const productList = response.data;

//         const mappedItems = productList.map((item) => ({
//           id: item.id,
//           avatarUrl: `/assets/images/avatars/avatar_1.jpg`,
//           nameProducts: 'randomProductName()',
//           quantity: Math.floor(Math.random() * 100) + 1,
//           classify: 'randomClassifyProducts()',
//           price: `${Math.floor(Math.random() * 10000000)} VNĐ`,
//           petType: 'randomPetTypeProducts()',
//           status: Math.random() < 0.5 ? 'Đang ẩn' : 'Đang bán',
//         }));

//         // const mappedItems = [...Array(24)].map((_, index) => ({
//         //     id: index + 1,
//         //     avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
//         //     nameProducts: 'randomProductName',
//         //     quantity: Math.floor(Math.random() * 100) + 1,
//         //     classify: 'randomClassifyProducts',
//         //     price: `${Math.floor(Math.random() * 10000000)} VNĐ`,
//         //     petType: 'randomPetTypeProducts',
//         //     status: Math.random() < 0.5 ? 'Đang ẩn' : 'Đang bán',
//         // }));

//         setItems(mappedItems);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   return items;
// };

// export default NameProducts;


function nameProducts ()  {
  
    
    // const list  =  [...Array(5)].map((_,index) => ({
    //     id: index+1,
    //     avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
    //     nameProducts: 'randomProductName()',
    //     quantity: Math.floor(Math.random() * 100) + 1,
    //     classify: 'randomClassifyProducts()',
    //     price: `${Math.floor(Math.random() * 10000000)} VNĐ`,
    //     petType: 'randomPetTypeProducts()',
    //     status: Math.random() < 0.5 ? 'Đang ẩn' : 'Đang bán',
    // }));
const temp = UseProductsByShopId(1);
    const list  =  temp.map((item) => ({
        id: item.id,
        avatarUrl: `/assets/images/avatars/avatar_1.jpg`,
        nameProducts: 'randomProductName()',
        quantity: Math.floor(Math.random() * 100) + 1,
        classify: 'randomClassifyProducts()',
        price: `${Math.floor(Math.random() * 10000000)} VNĐ`,
        petType: 'randomPetTypeProducts()',
        status: Math.random() < 0.5 ? 'Đang ẩn' : 'Đang bán',
    }));
  
    return list ;
  };


export default nameProducts();