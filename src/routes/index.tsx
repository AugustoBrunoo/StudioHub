import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
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
  // Standalone Landing Page (100% faithful to prototype)
  {
    path: '/',
    element: <HomePage />,
  },

  // Other Public Institutional Pages
  {
    element: <PublicLayout />,
    children: [
      {
        path: 'planos',
        element: <PricingPage />,
      },
      {
        path: 'sobre',
        element: <AboutPage />,
      },
    ],
  },

  // Auth Routes (Login / Register)
  {
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'cadastro',
        element: <RegisterPage />,
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
]);
