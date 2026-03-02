import { useEffect, useState } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router';
import useFetchData from '../../hooks/useFetchData';
import { isUserOwnedRoute } from '../../api/auth.job';
import { isUserLoggedIn } from '../../api/auth.user';

export default function IsloggedinUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isVerify, setIsVerify] = useState(false);
  const {execute, error}=useFetchData(isUserLoggedIn)
  useEffect(() => {
    ;(async ()=>{
      const success = await execute();
      if (!success) {
        navigate('/auth/login', { replace: true });
      }
    })()
  }, [id, navigate]);
  if(error){
    setIsVerify(false);
    navigate('./../')
  }
  if (isVerify) return <p>Checking authentication</p>; 
  return <Outlet />;
};


