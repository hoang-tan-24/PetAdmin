import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const updatePet = async (id, updateData) => {
    try {
        const response = await axios.put(`https://api20230626100239.azurewebsites.net/api/Pet/${id}`, updateData);
        toast.success('Chỉnh sửa thú cưng thành công!');
        return response.data;
    } catch (error) {
        console.error(error);
        toast.error('Chỉnh sửa thú cưng không thành công! Vui lòng thử lại!');
        throw error;
    }
};

export { updatePet };