import { createBrowserRouter, ScrollRestoration, Outlet } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { ProtectedRoute } from '@/routes/ProtectedRoute';

// Public Pages
import { HomePage } from '@/pages/public/HomePage';
import { PricingPage } from '@/pages/public/PricingPage';
import { AboutPage } from '@/pages/public/AboutPage';

// Auth Pages
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';

// Dashboard Pages
import { DashboardOverviewPage } from '@/pages/dashboard/DashboardOverviewPage';
import { StudiosPage } from '@/pages/dashboard/StudiosPage';
import { BookingsPage } from '@/pages/dashboard/BookingsPage';
import { UsersManagementPage } from '@/pages/dashboard/UsersManagementPage';
import { SettingsPage } from '@/pages/dashboard/SettingsPage';

// Error Pages
import { NotFoundPage } from '@/pages/errors/NotFoundPage';
import { UnauthorizedPage } from '@/pages/errors/UnauthorizedPage';

export const router = createBrowserRouter([
  {
    element: (
      <>
        <ScrollRestoration />
        <Outlet />
      </>
    ),
    children: [
      // Standalone Marketing & Auth Pages (100% faithful to prototypes)
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/planos',
        element: <PricingPage />,
      },
      {
        path: '/precos',
        element: <PricingPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/cadastro',
        element: <RegisterPage />,
      },
      {
        path: '/registro',
        element: <RegisterPage />,
      },

      // Other Public Institutional Pages
      {
        element: <PublicLayout />,
        children: [
          {
            path: 'sobre',
            element: <AboutPage />,
          },
        ],
      },

  // Protected App & Dashboard Routes
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardOverviewPage />,
      },
      {
        path: 'studios',
        element: <StudiosPage />,
      },
      {
        path: 'agendamentos',
        element: <BookingsPage />,
      },
      {
        path: 'usuarios',
        element: (
          <ProtectedRoute allowedRoles={['admin', 'studio_manager']}>
            <UsersManagementPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'configuracoes',
        element: <SettingsPage />,
      },
    ],
  },

    // Error Pages
    {
      path: '/unauthorized',
      element: <UnauthorizedPage />,
    },
    {
      path: '/404',
      element: <NotFoundPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ],
},
]);
