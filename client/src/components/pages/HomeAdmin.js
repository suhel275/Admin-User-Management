import React, { useContext, useEffect } from 'react';
import Users from '../users/Users';
import AuthContext from '../../context/auth/authContext';

const HomeAdmin = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadAdmin();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Users />
    </div>
  );
};

export default HomeAdmin;
