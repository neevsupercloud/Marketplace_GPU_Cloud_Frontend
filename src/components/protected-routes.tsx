
import { Outlet } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

const ProtectedRoute = () => {
  const { keycloak } = useKeycloak();

  if (!keycloak.authenticated) {
    keycloak.login();
    return null; // Ensure nothing is rendered while redirecting
  }

  return <Outlet />;
};

export default ProtectedRoute;
