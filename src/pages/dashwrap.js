import React from 'react';
import { Outlet } from 'react-router-dom';
import Dashnav from '../Components/Dashnav';

const DashWrap = ({ setRouteTrue }) => {
  return (
    <>
      <Dashnav setRouteTrue={setRouteTrue} />
      <Outlet />
    </>
  );
};

export default DashWrap;
