const randomProductName = () => {
  const productNames = [
    "Patê cho thú cưng",
    "Súp thưởng chó mèo",
    "Thức ăn hạt chó mèo",
    "Lồng vận chuyển thú cưng",
    "Thuốc xổ giun cho chó mèo",
    "Đồ chơi cho thú cưng",
    "Thuốc trị nấm cho thú cưng",
    "Khăn tắm cho thú cưng",
    "Lược chải lông cho thú cưng",
    "Bóng đồ chơi cho thú cưng"
  ];


  const randomIndex = Math.floor(Math.random() * productNames.length);
  return productNames[randomIndex];
};

const users = [...Array(24)].map((_, index) => ({
  id: index + 1,
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  nameOrders: randomProductName(),
  buyer: `Người nhận ${index + 1}`,
  quantity: Math.floor(Math.random() * 100) + 1,
  total: `${Math.floor(Math.random() * 10000000)} VNĐ`,
  address: `Address ${index + 1}`,
  status: Math.random() < 0.5 ? 'SELLING' : 'WAITTING',

}));

export default users;
