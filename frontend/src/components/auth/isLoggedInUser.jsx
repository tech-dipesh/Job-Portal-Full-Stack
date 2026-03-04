import {  useEffect, useState } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router';
import useFetchData from '../../hooks/useFetchData';
import { isUserOwnedRoute } from '../../api/auth.job';
import { isUserLoggedIn } from '../../api/auth.user';
import { useAuth } from '../../context/Authcontext';

export default function IsloggedinUser() {
  const { id } = useParams();
  const navigate=useNavigate()
  const {data, error, loading}=useAuth()
  useEffect(() => {
  if(error) navigate("/auth/login", { state: { from: location.pathname }, replace: true })
  }, [error])

  if (loading) return <p>Checking authentication</p>; 
  return <Outlet data={data}/>;
};