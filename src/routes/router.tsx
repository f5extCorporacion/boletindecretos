// src/router.tsx
import { Suspense, lazy } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Splash from 'components/loader/Splash';
import PageLoader from 'components/loader/PageLoader';
import paths, { rootPaths } from './paths';
import ProtectedRoute from 'components/autentica/ProtectedRoute ';
import { AuthProvider } from 'components/autentica/AuthContext';



const App = lazy(() => import('App'));
const MainLayout = lazy(() => import('layouts/main-layout'));
const AuthLayout = lazy(() => import('layouts/auth-layout'));
const Dashboard = lazy(() => import('pages/dashboard'));
const SignIn = lazy(() => import('pages/authentication/SignIn'));
const SignUp = lazy(() => import('pages/authentication/SignUp'));
const ResetPassword = lazy(() => import('pages/authentication/ResetPassword'));
const Error404 = lazy(() => import('pages/errors/Error404'));
const Boletiness = lazy(() => import('pages/boletines/'));
const MisBoletiness = lazy(() => import('pages/misboletines/index'));
const GestionBoletiness = lazy(() => import('pages/boletines/gestionboletin'));
const Anexos = lazy(() => import('pages/anexos/'));
const routes = [
  {
    element: (
      <AuthProvider>
        <Suspense fallback={<Splash />}>
          <App />
        </Suspense>
      </AuthProvider>
    ),
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <Outlet />
              </Suspense>
            </MainLayout>
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
        ],
      },

/*Routa ======================================== */
      {
        path: paths.boletines, 
        element: (
          <ProtectedRoute>
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <Outlet />
              </Suspense>
            </MainLayout>
          </ProtectedRoute>
        ),
        children: [
          {
            path: paths.boletines,
            element: <Boletiness />,
          },
        ],
      },
      /*-------------------------- */
      {
        path: paths.anexos,
        element: (
          <ProtectedRoute>
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <Outlet />
              </Suspense>
            </MainLayout>
          </ProtectedRoute>
        ),
        children: [
          {
            path: paths.anexos,
            element: <Anexos />,
          },
        ],
      },

      {
        path: paths.gestionboletin,    
        element: (
          <ProtectedRoute>
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <Outlet />
              </Suspense>
            </MainLayout>
          </ProtectedRoute>
        ),
        children: [
          {
            path: paths.gestionboletin,
            element: <GestionBoletiness/>,
          },
        ],
      },
      {
        path: paths.misboletines,    
        element: (
          <ProtectedRoute>
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <Outlet />
              </Suspense>
            </MainLayout>
          </ProtectedRoute>
        ),
        children: [
          {
            path: paths.misboletines,
            element: <MisBoletiness/>,
          },
        ],
      },
/*========================================================= */
      {
        path: rootPaths.authRoot,
        element: (
          <Suspense fallback={<Splash />}>
            <Outlet />
          </Suspense>
        ),
        children: [
          {
            path: paths.signin,
            element: (
              <AuthLayout>
                <SignIn />
              </AuthLayout>
            ),
          },
          {
            path: paths.signup,
            element: (
              <AuthLayout>
                <SignUp />
              </AuthLayout>
            ),
          },
          {
            path: paths.resetPassword,
            element: <ResetPassword />,
          },
        ],
      },
      {
        path: '*',
        element: <Error404 />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, { basename: '/boletindecretos' });

export default router;

