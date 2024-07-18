import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';
import Cookies from 'js-cookie';
import Sidebar from './components/sidebar';
// import LoadingSpinner from './components/LoadingSpinner';
import Navbar from './components/navbar';
import ErrorModal from './components/modals/error-modal';
// import LoadingModal from './components/modals/loading-modal';3
import TopHeader from './components/navbar/topHeader';
import keycloak from './pages/auth/useAuth';
import { useStore } from './store';
import './index.css';
import ProtectedRoute from './components/protected-routes';
import './index.css';
// import { Spinner } from '@chakra-ui/react';

// Lazy loaded components
const CreateVm = lazy(() => import('./pages/secure-cloud'));
const Volumes = lazy(() => import('./pages/storage'));
const Deploy = lazy(() => import('./pages/deploy'));
const Keys = lazy(() => import('./pages/keys'));
const Secrets = lazy(() => import('./pages/secrets'));
const NewDeployment = lazy(() => import('./pages/ai-platform/new-deployment'));
const ViewDeployments = lazy(() => import('./pages/ai-platform/view-deployments'));
const GPUCompute = lazy(() => import('./pages/GPUCompute/index'));
const GPUDashboard = lazy(() => import('./pages/GPUDashboard/index'));
const Serverless = lazy(() => import('./pages/Serverless/index'));
const Billing = lazy(() => import('./pages/billing/index'));
const ServerLessDashboard = lazy(() => import('./pages/ServerLessDashboard/index'));
const ModalView = lazy(() => import('./pages/Serverless/ModalView'));
const Dashboards = lazy(() => import('./pages/dashboard/index'));
const AboutInstanceGpu = lazy(() => import('./pages/GPUDashboard/AboutInstanceGpu'));
const Contact_info = lazy(() => import('./pages/contact/contact'));
const FAQ = lazy(() => import('./faq/FAQ'));
// const Feedback = lazy(() => import('./pages/feedback'));
const Spinner = lazy(() => import('./components/Spinner-loader'));

interface AuthClientTokens {
  token?: string;
  refreshToken?: string;
  idToken?: string;
}

const App = () => {
  const navigate = useNavigate();
  const { error, loading } = useStore();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const { setAuth: _setAuth } = useStore();

  useEffect(() => {
    const lastPath = localStorage.getItem('lastPath');
    if (lastPath) {
      navigate(lastPath);
    }
  }, [navigate]);

  const handleKeycloakEvent = (event: string, error: any) => {
    console.log('onKeycloakEvent', event, error);
    if (event === 'onAuthSuccess') {
      navigate('/');
    }
    console.log('all', keycloak);
  };

  const handleKeycloakTokens = (tokens: AuthClientTokens) => {
    console.log('onKeycloakTokens', tokens);
    if (tokens.token) {
      Cookies.set('auth_token', tokens.token, { expires: 7, sameSite: 'None', secure: true });
      _setAuth(tokens.token);
      console.log('access token', tokens);
    }
  };

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      onEvent={handleKeycloakEvent}
      onTokens={handleKeycloakTokens}
      initOptions={{ onLoad: 'login-required' }}
    >
      <React.StrictMode>
        <MainApp
          isSidebarVisible={isSidebarVisible}
          setIsSidebarVisible={setIsSidebarVisible}
        />
        {error && <ErrorModal />}
        {loading && <Spinner/>}
      </React.StrictMode>
    </ReactKeycloakProvider>
  );
};

const MainApp = ({ isSidebarVisible, setIsSidebarVisible }: { isSidebarVisible: boolean, setIsSidebarVisible: (visible: boolean) => void }) => {
  const { keycloak } = useKeycloak();

  if (!keycloak.authenticated) {
    return (
      <Suspense >
        <Spinner />
      </Suspense>
    );
  }

  const handleToggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="w-screen h-screen grid grid-cols-12 grid-rows-12">
      <div className={`custom-grid-item ${isSidebarVisible ? 'visible' : ''}`}>
        <Sidebar onToggleSidebar={handleToggleSidebar} />
      </div>
      <div className="custom-grid-item-navbar">
        <div className="flex flex-col justify-start items-start">
          <Navbar onToggleSidebar={handleToggleSidebar} />
          <TopHeader />
        </div>
      </div>
      <div className="custom-grid-item-whole_dash_component bg-[#ffffff] ">
        <Suspense fallback={<div></div>}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/ai-platform/deploy" element={<NewDeployment />} />
              <Route path="/ai-platform/view-deployments" element={<ViewDeployments />} />
              <Route path="/create-vm" element={<CreateVm />} />
              <Route path="/create-vm/configure" element={<Deploy />} />
              <Route path="/manage/volumes" element={<Volumes />} />
              <Route path="/manage/ssh-keys" element={<Keys />} />
              <Route path="/manage/secrets" element={<Secrets />} />
              <Route path="/gpu-compute/create-gpu-instance" element={<GPUCompute />} />
              <Route path="/gpu-compute/gpu-dashboard" element={<GPUDashboard />} />
              <Route path="/gpu-compute/about-instance/:slug" element={<AboutInstanceGpu />} />
              <Route path="/serverless/deploy-model" element={<Serverless />} />
              <Route path="/serverless/serverless-dashboard" element={<ServerLessDashboard />} />
              <Route path="/serverless/modal-view/:slug" element={<ModalView />} />
              <Route path="/contact" element={<Contact_info />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/faq" element={<FAQ />} />
              {/* <Route path="/docs" element={<Feedback />} /> */}
            </Route>
            <Route path="/*" element={<Dashboards />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
