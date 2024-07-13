import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const UserPage = lazy(() => import('src/pages/user'));
export const AddAdminPage = lazy(() => import('src/pages/create-admin'));
export const CoursePage = lazy(() => import('src/pages/courses'));
export const TransactionPage = lazy(() => import('src/pages/transaction'));
export const UserDetailPage = lazy(() => import('src/pages/user-detail'));
export const SystemPage = lazy(() => import('src/pages/system'));

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          element: <IndexPage />,
          index: true,
        },
        {
          path: 'user',
          element: <UserPage />,
        },
        {
          path: 'user/:uuid',
          element: <UserDetailPage />,
        },
        {
          path: 'create-admin',
          element: <AddAdminPage />,
        },
        {
          path: 'courses',
          element: <CoursePage />,
        },
        {
          path: 'transaction',
          element: <TransactionPage />,
        },
        {
          path: 'system',
          element: <SystemPage />,
        },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
