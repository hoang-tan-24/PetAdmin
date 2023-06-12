
const nameProducts = [...Array(24)].map((_, index) => ({
    id: index + 1,
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
    nameServices: `Service ${index + 1}`,
    quantity: `Quantity ${index + 1}`,
    classify: `Classify ${index + 1}`,
    total: `${Math.floor(Math.random() * 10000000)} VNĐ`,
    status: Math.random() < 0.5 ? 'SELLING' : 'WAITTING',
}));

export default nameProducts;
