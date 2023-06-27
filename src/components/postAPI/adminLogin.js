import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const adminLogin = async (username, password) => {
    try {
        const promise = axios.post(`https://petuni-api.azurewebsites.net/api/SystemAdmin?username=${username}&password=${password}`);

        toast.promise(
            promise,
            {
                pending: 'Đang xử lý...',
                success: 'Đăng nhập thành công!',
                error: 'Đăng nhập thất bại! Vui lòng thử lại!',
            },
            { toastId: 'LoginAdminToast' }
        );

        const response = await promise;
        const data = response.data;
        if (data != null)
            localStorage.setItem('admin', JSON.stringify(data));
        return data;
    } catch (error) {
        // toast.error('Đăng nhập không thành công! Vui lòng thử lại!');
        console.error(error);
        throw error;
    }
};

export { adminLogin };