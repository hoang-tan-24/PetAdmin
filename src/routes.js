import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import ServicePage from './pages/ServicePage';
import OrderPage from './pages/OrderPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import Calendar from './pages/Calendar';
import PetPage from './pages/PetPage';
import SystemProductPage from './pages/SystemProductPage';
import SystemPetPage from './pages/SystemPetPage';
import SystemServicePage from './pages/SystemServicePage';
import SystemShopPage from './pages/SystemShopPage';
import SystemUserPage from './pages/SystemUserPage';
import SystemDashboardPage from './pages/SystemDashboardPage';
import ProfilePage from './pages/ProfilePage';




// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'order', element: <OrderPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'service', element: <ServicePage /> },
        { path: 'calendar', element: <Calendar /> },
        { path: 'pets', element: <PetPage /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'system/pets', element: <SystemPetPage /> },
        { path: 'system/products', element: <SystemProductPage /> },
        { path: 'system/services', element: <SystemServicePage /> },
        { path: 'system/shops', element: <SystemShopPage /> },
        { path: 'system/users', element: <SystemUserPage /> },
        { path: 'system/dashboard', element: <SystemDashboardPage /> },
      ],
    },
    {
      path: '/system',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/system/dashboard" />, index: true },
        { path: 'dashboard', element: <SystemDashboardPage /> },
        { path: 'users', element: <SystemUserPage /> },
        { path: 'shops', element: <SystemShopPage /> },
        { path: 'pets', element: <SystemPetPage /> },
        { path: 'products', element: <SystemProductPage /> },
        { path: 'services', element: <SystemServicePage /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
