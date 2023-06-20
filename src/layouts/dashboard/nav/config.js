import SvgColor from '../../../components/svg-color';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const dashboardNavConfig = [
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
    icon: icon('ic_product'),
  },
  {
    title: 'Quản lí dịch vụ',
    path: '/dashboard/service',
    icon: icon('ic_services'),
  },
  {
    title: 'Lịch sử dụng dịch vụ',
    path: '/dashboard/calendar',
    icon: icon('ic_calendar'),
  },
];

const systemNavConfig = [
  {
    title: 'Hệ thống Tổng quan',
    path: '/system/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Hệ thống ngươi dùng',
    path: '/system/users',
    icon: icon('ic_user'),
  },
  {
    title: 'Hệ thống cửa hàng',
    path: '/system/shops',
    icon: icon('ic_shop'),
  },
  {
    title: 'Hệ thống thú cưng',
    path: '/system/pets',
    icon: icon('ic_pets'),
  },
  {
    title: 'Hệ thống sản phẩm',
    path: '/system/products',
    icon: icon('ic_product'),
  },
  {
    title: 'Hệ thống dịch vụ',
    path: '/system/services',
    icon: icon('ic_services'),
  },
];

export { dashboardNavConfig, systemNavConfig };
