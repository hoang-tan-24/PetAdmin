// component
import SvgColor from '../../../components/svg-color';


// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Tổng quan',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Quản lí đơn hàng',
    path: '/dashboard/order',
    icon: icon('ic_user'),
  },
  {
    title: 'Quản lí thú cưng',
    path: '/dashboard/pets',
    icon: icon('ic_pets'),
  },
  {
    title: 'Quản lí sản phẩm',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Quản lí dịch vụ',
    path: '/dashboard/service',
    icon: icon('ic_cart'),
  },
  {
    title: 'Đăng nhập',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Lịch sử dụng dịch vụ',
    path: '/dashboard/calendar',
    icon: icon('ic_calendar'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },

];

export default navConfig;
