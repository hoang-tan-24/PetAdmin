import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const createPet = async (createData) => {
    try {
        const promise = await axios.post('https://petuni-api.azurewebsites.net/api/Pet', createData);
        toast.promise(
            promise,
            {
                pending: 'Đang thêm thú cưng...',
                success: 'Thêm thú cưng thành công!',
                error: 'Thêm thú cưng không thành công! Vui lòng thử lại!',
            },
            { toastId: 'createPetToast' }
        );

        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        // toast.error('Thêm thú cưng không thành công! Vui lòng thử lại!');
        throw error;
    }
};

export { createPet };