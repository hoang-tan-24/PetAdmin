import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const updatePet = async (id, updateData) => {
    try {
        const promise = await axios.put(`https://petuni-api.azurewebsites.net/api/Pet/${id}`, updateData);
        toast.promise(
            promise,
            {
                pending: 'Đang chỉnh sửa thú cưng...',
                success: 'Chỉnh sửa thú cưng thành công!',
                error: 'Chỉnh sửa thú cưng không thành công! Vui lòng thử lại!',
            },
            { toastId: 'updatePetToast' }
        );
        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        // toast.error('Chỉnh sửa thú cưng không thành công! Vui lòng thử lại!');
        throw error;
    }
};

export { updatePet };