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
        { path: 'pets', element: <PetPage /> }
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
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
