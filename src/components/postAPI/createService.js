import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const createService = async (serviceData) => {
    try {
        const promise = await axios.post('https://petuni-api.azurewebsites.net/api/Service', serviceData);
        toast.promise(
            promise,
            {
                pending: 'Đang thêm dịch vụ...',
                success: 'Thêm dịch vụ thành công!',
                error: 'Thêm dịch vụ không thành công! Vui lòng thử lại!',
            },
            { toastId: 'createServiceToast' }
        );

        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        // toast.error('Thêm dịch vụ không thành công! Vui lòng thử lại!');
        throw error;
    }
};

export { createService };