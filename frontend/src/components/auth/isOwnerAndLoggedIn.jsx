import { useEffect } from 'react';
import { useParams, useNavigate, Outlet, useLocation, Navigate } from 'react-router';
import Loading from '../Loading';
import Errorloading from '../common/Errorloading';
import { useAuth } from '../../context/Authcontext';
import authUid from '../../auth/authUid';

export default function IsOwnerandLoggedIn() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, error, loading } = useAuth();
  const isValid = id && authUid(id);

  useEffect(() => {
    if (!user) return <Navigate to="/auth/login" />;
    if (error?.login === true && error?.verify === false) {
      navigate("/auth/verify-email", { state: { from: location.pathname }, replace: true });
      return;
    }
    if (error) {
      navigate("/auth/login", { state: { from: location.pathname }, replace: true });
      return;
    }
  }, [error, navigate, location]);

  if (loading) {
    return <Loading />;
  }

  if (id && !isValid) {
    setTimeout(() => {
      navigate("/");
    }, 1000);
    return <Errorloading data={{ error: 'Incorrect uid. Please enter correct uid. Redirecting...' }} />;
  }

  return <Outlet context={user} />;
}